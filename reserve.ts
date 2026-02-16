export type HelperKind = 'none' | 'min' | 'max' | 'multiple';

export interface ShareConstraints {
  shareAmount: number;   // valeur nominale d'une part
  minAmount: number;     // montant min autorisé
  maxAmount: number;     // montant max autorisé
  minParts: number;      // nb parts min
  maxParts: number;      // nb parts max
}

export interface NormalizationResult {
  normalizedAmount: number;
  parts: number;
  helper: HelperKind;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function nearestMultiple(value: number, step: number): number {
  if (!step) return value;
  const lower = Math.floor(value / step) * step;
  const upper = Math.ceil(value / step) * step;
  return value - lower <= upper - value ? lower : upper;
}

/**
 * Normalise le montant :
 * - clamp min/max
 * - arrondi au multiple le plus proche de shareAmount
 * - calcule parts
 * - détermine quel helper afficher
 */
export function normalizeAmount(
  raw: number,
  c: ShareConstraints,
): NormalizationResult {
  const clamped = clamp(raw, c.minAmount, c.maxAmount);
  const normalized = nearestMultiple(clamped, c.shareAmount);

  const parts = Math.floor(normalized / c.shareAmount);

  let helper: HelperKind = 'none';
  if (raw < c.minAmount) helper = 'min';
  else if (raw > c.maxAmount) helper = 'max';
  else if (normalized !== raw) helper = 'multiple';

  return { normalizedAmount: normalized, parts, helper };
}




import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ShareConstraints } from './social-share.domain';

export const minAmountValidator = (min: () => number): ValidatorFn =>
  (ctrl: AbstractControl): ValidationErrors | null => {
    const v = Number(ctrl.value);
    if (!Number.isFinite(v)) return { amountNaN: true };
    return v < min() ? { minAmount: { min: min(), actual: v } } : null;
  };

export const maxAmountValidator = (max: () => number): ValidatorFn =>
  (ctrl: AbstractControl): ValidationErrors | null => {
    const v = Number(ctrl.value);
    if (!Number.isFinite(v)) return { amountNaN: true };
    return v > max() ? { maxAmount: { max: max(), actual: v } } : null;
  };

export const multipleOfValidator = (step: () => number): ValidatorFn =>
  (ctrl: AbstractControl): ValidationErrors | null => {
    const v = Number(ctrl.value);
    const s = step();
    if (!Number.isFinite(v)) return { amountNaN: true };
    if (!s) return null;
    return v % s !== 0 ? { multipleOf: { step: s, actual: v } } : null;
  };

/**
 * Option : validator “composite” si tu préfères un seul.
 */
export const shareAmountValidators = (c: () => ShareConstraints | undefined): ValidatorFn[] => [
  (ctrl) => {
    const constraints = c();
    if (!constraints) return null;
    const v = Number(ctrl.value);
    if (!Number.isFinite(v)) return { amountNaN: true };

    if (v < constraints.minAmount) return { minAmount: { min: constraints.minAmount, actual: v } };
    if (v > constraints.maxAmount) return { maxAmount: { max: constraints.maxAmount, actual: v } };
    if (v % constraints.shareAmount !== 0) return { multipleOf: { step: constraints.shareAmount, actual: v } };

    return null;
  },
];



import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

import { TrackingService } from '@bpce/ng-subscription-services/tracking';
import { NeoDialogModule, NeoDialogService } from '@bpce/neo-ng/dialog';
import { NeoButtonComponent, NeoButtonGroupComponent } from '@bpce/neo-ng/button';
import { NeoSliderComponent, NeoSliderThumbLabelFunction } from '@bpce/neo-ng/slider';
import { NeoTextHelperComponent } from '@bpce/neo-ng/text-helper';
import { NeoCardComponent } from '@bpce/neo-ng/card';
import { NeoInputAmountComponent } from '@bpce/neo-ng/input-amount';
import { NeoShimmeringComponent } from "@bpce/neo-ng/shimmering";
import { InformationPromptLayoutComponent } from '@bpce/ng-subscription-ui/information-prompt-layout';

import { BapiStore } from '@bpce/ng-subscription-services/bapi/store';
import { DigitalParameters } from '../../models/digital-parameters';
import { BapiStoreService } from '@app/services/store/bapi.store.service';
import { InputStoreService } from '@app/services/store/input.store.service';
import { Router } from '@angular/router';
import { StepRouteEnum } from '@app/routes';

import { SAISIE_PARTS_WORDING } from '@app/constants/wording/saisie-parts-wording.constant';
import { SAISIE_PART_PAGE_DATALAYER } from '@app/constants/tracking/tracking.constant';
import { NestedKeys, WordingPipe, WordingUtils } from '@bpce/ng-subscription-ui/utils';

import { PdfViewModalComponent } from '../modals/pdf-view-modal/pdf-view.modal.component';
import { UpdateAmountModalComponent } from '../modals/update-amount-modal/update-amount.modal.component';

import { ShareConstraints, normalizeAmount } from './social-share.domain';
import { shareAmountValidators } from './social-share.validators';

type AmountForm = FormGroup<{
  input: FormControl<number | null>;
}>;

@Component({
  selector: 'app-saisie-parts',
  templateUrl: './saisie-parts.component.html',
  styleUrl: './saisie-parts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InformationPromptLayoutComponent,
    ReactiveFormsModule,
    NeoButtonComponent,
    NeoButtonGroupComponent,
    NeoSliderComponent,
    NeoTextHelperComponent,
    NeoCardComponent,
    NeoDialogModule,
    NeoInputAmountComponent,
    WordingPipe,
    CurrencyPipe,
    NeoShimmeringComponent,
  ],
})
export class SaisiePartsComponent {
  private readonly tracking = inject(TrackingService);
  private readonly neoDialog = inject(NeoDialogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  private readonly bapiStore = inject(BapiStoreService);
  private readonly inputStore = inject(InputStoreService);
  private readonly bapiStoreParam: BapiStore<DigitalParameters> = inject(BapiStore);

  readonly template = SAISIE_PARTS_WORDING;
  readonly supportsPdfViewer = navigator.pdfViewerEnabled;

  // UI state minimal
  readonly isInputFocused = signal(false);
  readonly isShimmering = signal(false);

  // --- Constraints (métier) ---
  readonly constraints = computed<ShareConstraints | undefined>(() => {
    const condition = this.bapiStore.conditionSocialShare.value();
    const selectedAccount = this.bapiStore.selectedAccount();
    const shareAmount = this.bapiStore.shareAmount();

    if (!condition || !selectedAccount) return undefined;

    const share = selectedAccount.shareAmount.value;

    return {
      shareAmount,
      minAmount: condition.characteristics.minimumShareNumber * share,
      maxAmount: condition.characteristics.remainingAmountToInvest.value,
      minParts: condition.characteristics.minimumShareNumber,
      maxParts: Math.floor(condition.characteristics.remainingAmountToInvest.value / share),
    };
  });

  // --- Form ---
  readonly form: AmountForm = new FormGroup({
    input: new FormControl<number | null>(null, {
      nonNullable: false,
      validators: [Validators.required, ...shareAmountValidators(() => this.constraints())],
    }),
  });

  private readonly inputValueSignal = toSignal(
    this.form.controls.input.valueChanges,
    { initialValue: this.form.controls.input.value },
  );

  // Init + tracking
  constructor() {
    this.tracking.trackPage(SAISIE_PART_PAGE_DATALAYER);

    // Initialise la valeur à minAmount quand constraints dispo
    effect(() => {
      const c = this.constraints();
      if (!c) return;

      const current = this.form.controls.input.value;
      if (current == null) {
        this.form.controls.input.setValue(c.minAmount, { emitEvent: false });
      }
    });

    // Normalisation sur blur / fin de saisie (pas à chaque keypress)
    // => tu déclenches normalize() depuis (blur) dans le template
  }

  // --- Derived state (UI) ---
  readonly normalized = computed(() => {
    const c = this.constraints();
    const raw = Number(this.inputValueSignal());
    if (!c || !Number.isFinite(raw)) return undefined;
    return normalizeAmount(raw, c);
  });

  readonly selectedParts = computed(() => this.normalized()?.parts ?? 0);

  readonly precision = computed(() => {
    const c = this.constraints();
    if (!c) return 2;
    const amount = this.normalized()?.normalizedAmount;
    // si multiple exact & pas focus -> 0 décimales
    if (!this.isInputFocused() && amount != null && Number.isInteger(amount)) return 0;
    return 2;
  });

  readonly formatLabel = computed<NeoSliderThumbLabelFunction>(() => {
    return (value: number) => `${value} €`;
  });

  // Wording helpers
  readonly helperKey = computed<NestedKeys<typeof SAISIE_PARTS_WORDING>>(() => {
    const n = this.normalized();
    if (!n) return 'form.helper.infoAmount';

    switch (n.helper) {
      case 'min': return 'form.helper.infoAmountMin';
      case 'max': return 'form.helper.infoAmountMax';
      case 'multiple': return 'form.helper.inputErreur';
      default: return 'form.helper.infoAmount';
    }
  });

  readonly helperAmount = computed(() => {
    const c = this.constraints();
    const n = this.normalized();
    if (!c || !n) return 0;

    if (n.helper === 'min') return c.minAmount;
    if (n.helper === 'max') return c.maxAmount;
    return c.shareAmount; // multiple
  });

  readonly titleKey = computed<NestedKeys<typeof SAISIE_PARTS_WORDING>>(() => {
    const hasValue = this.form.controls.input.value != null;
    if (!hasValue) return 'header.title.default';
    return this.isShimmering() ? 'header.title.editedShimmering' : 'header.title.edited';
  });

  readonly description = computed(() =>
    WordingUtils.applyWording('header.description', this.template, {
      SHARE_AMOUNT: this.constraints()?.shareAmount,
    }),
  );

  readonly getNoticeLink = computed(() =>
    this.bapiStoreParam.digitalParameters.value()?.links.technicalNoticeLink,
  );

  // --- Actions ---
  onInput(): void {
    this.isShimmering.set(true);
  }

  onBlurNormalize(): void {
    this.isShimmering.set(false);
    this.isInputFocused.set(false);

    const c = this.constraints();
    const raw: number = Number(this.form.controls.input.value);
    if (!c || !Number.isFinite(raw)) return;

    const { normalizedAmount } = normalizeAmount(raw, c);
    // On évite les boucles : on set seulement si différent
    if (normalizedAmount !== raw) {
      this.form.controls.input.setValue(normalizedAmount, { emitEvent: true });
    }
    this.form.controls.input.markAsDirty();
  }

  onSliderChange(amount: number): void {
    this.form.controls.input.setValue(amount);
    // pas de normalize ici : le slider respecte déjà step
  }

  openNotice(): void {
    this.neoDialog
      .open(PdfViewModalComponent)
      .pipe(
        switchMap((ref) => ref.afterClose()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  continue(): void {
    const c = this.constraints();
    const amount = Number(this.form.controls.input.value);

    if (!c || !Number.isFinite(amount)) return;

    if (amount > c.maxAmount) {
      this.neoDialog
        .open(UpdateAmountModalComponent, {
          data: {
            maximumAllowedAmount: c.maxAmount,
            maximumAllowedParts: c.maxParts,
          },
        })
        .pipe(
          switchMap((ref) => ref.afterClose()),
          tap(() => {
            this.form.controls.input.setValue(c.maxAmount);
            this.form.controls.input.markAsDirty();
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe();
      return;
    }

    const parts = this.selectedParts();
    const boundedParts = Math.min(Math.max(parts, c.minParts), c.maxParts);

    this.inputStore.setShareNumberSelected(boundedParts);
    this.router.navigate([StepRouteEnum.QUESTION_INTRO]);
  }
}
