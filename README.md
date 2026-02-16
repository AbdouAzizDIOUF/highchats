Parfait, la base est **déjà très solide** 👍
On sent clairement une volonté de **guide structurant, durable et “socle Angular”**.
Je vais te faire un retour **très détaillé**, en restant **aligné avec les recommandations officielles Angular** (Angular.dev / Angular style guide), et en te disant **quoi ajouter + pourquoi c’est défendable**.

---

## 1️⃣ Ce qui est déjà TRÈS bien (fondations saines)

Votre arborescence couvre déjà **90 % de ce que recommande Angular officiellement** :

### ✔️ Axes déjà conformes aux guidelines Angular

* Séparation **Développement / TS / HTML / CSS**
* Focus sur :

  * **Structure**
  * **Nommage**
  * **Standalone components**
  * **Typage TypeScript**
  * **Inputs / Outputs**
  * **Control Flow**
  * **Accessibilité**
* Présence explicite de :

  * `ng-deep` (avec warning 🔥 → très bien)
  * Design Tokens
  * Imports organisés

👉 Rien à jeter. On est sur un **niveau déjà senior**.

---

## 2️⃣ Ce qu’il manque pour être aligné à 100 % avec Angular OFFICIEL

Je vais te proposer des **sections à ajouter**, exactement comme Angular les structure dans ses docs.

---

## 🔹 A. Architecture & responsabilité (manque clé)

### ➕ Nouvelle section : **Architecture & Responsibility**

**Pourquoi ?**
Angular insiste énormément sur la **séparation des responsabilités**.

À ajouter :

* 🧱 **Smart vs Dumb components**

  * Container / Presentational
* 📦 **Feature-first structure** (recommandée officiellement)
* 🚫 Interdiction de logique métier lourde dans les composants
* 📁 Où placer :

  * services
  * facades
  * adapters
  * mappers

➡️ Source Angular :

> “Components should focus on presentation logic, delegating business logic to services.”

---

## 🔹 B. Change Detection & Performance (gros oubli courant)

### ➕ Nouvelle section : **Performance & Change Detection**

Indispensable pour un vrai guide Angular.

À inclure :

* `ChangeDetectionStrategy.OnPush` (par défaut recommandé)
* Usage de `trackBy`
* Eviter :

  * fonctions dans le template
  * pipes non purs
* AsyncPipe obligatoire
* Signals :

  * quand utiliser `signal`
  * quand préférer `computed`
  * quand éviter `effect`

➡️ Angular officiel insiste énormément dessus depuis Angular 16+

---

## 🔹 C. Signals & Reactivity (Angular 16+ / 17 / 18 / 19)

### ➕ Nouvelle section : **Signals & State Management**

Aujourd’hui **incontournable**.

À cadrer clairement :

* `signal` vs `BehaviorSubject`
* `computed` vs getter
* `effect` → règles strictes
* Inputs Signals (`input()` / `output()`)
* Interdictions :

  * effet avec side-effects non maîtrisés
  * mutation hors signal

➡️ Angular.dev = section “Signals” prioritaire

---

## 🔹 D. Routing & Navigation

### ➕ Nouvelle section : **Routing & Navigation**

Très souvent oubliée dans les guides internes.

À inclure :

* Lazy loading obligatoire par feature
* Guards :

  * quand utiliser `canActivate`
  * quand éviter
* Resolvers (quand OUI / quand NON)
* Standalone routing
* Redirects par défaut
* Préchargement (`PreloadAllModules`)

---

## 🔹 E. Forms (Reactive Forms modernes)

### ➕ Nouvelle section : **Forms & Validation**

À structurer :

* Reactive Forms only (recommandé Angular)
* Typed Forms
* Custom Validators (pure functions)
* Validation cross-field
* Gestion des erreurs dans le template
* Interdiction :

  * logique métier dans le HTML
  * `any` dans les forms

---

## 🔹 F. Tests (section manquante critique)

### ➕ Nouvelle section : **Testing**

Angular officiel insiste énormément là-dessus.

À inclure :

* Tests unitaires :

  * composants
  * services
  * pipes
* Tests avec :

  * TestBed minimal
  * Mocks propres
* Interdiction :

  * test trop couplé au DOM
* Coverage attendu
* Tests de composants standalone

---

## 🔹 G. Sécurité (souvent oublié)

### ➕ Nouvelle section : **Security Best Practices**

À ajouter :

* `DomSanitizer` (quand et pourquoi)
* Interdiction :

  * `[innerHTML]` sans sanitization
* Gestion des tokens
* Pas de logique sensible côté front
* Attention aux logs

---

## 🔹 H. Observables & RxJS (même avec Signals)

### ➕ Nouvelle section : **RxJS & Async patterns**

Même avec Signals, RxJS reste clé.

À cadrer :

* `switchMap` > `subscribe`
* `takeUntilDestroyed`
* Pas de subscribe manuel dans les composants
* Services = source d’Observable
* Conversion Observable → Signal (quand nécessaire)

---

## 3️⃣ Amélioration de la structure du guide lui-même

### 💡 Proposition d’arborescence finale (très défendable)

```text
Guide de bonnes pratiques Angular

1. Général
2. Architecture & Structure
3. Standalone Components
4. Nommage & Organisation
5. Signals & State Management
6. Performance & Change Detection
7. Routing & Navigation
8. Forms & Validation
9. TypeScript
10. HTML Templates
11. CSS & Styling
12. RxJS & Async
13. Sécurité
14. Accessibilité
15. Testing
16. Anti-patterns (🔥 à éviter)
```

➡️ Cette structure **colle presque exactement à Angular.dev**

---

## 4️⃣ Conseil senior (important)

👉 Pour chaque règle :

* Ajouter **POURQUOI**
* Ajouter **BON / MAUVAIS exemple**
* Ajouter **référence Angular officielle**

Exemple :

> 🔗 Source : angular.dev/guide/signals

Ça rend le guide :

* incontestable
* pédagogique
* durable dans le temps

---

## 5️⃣ Conclusion honnête

💬 **Avis franc** :
Vous êtes déjà à **un niveau très élevé**, clairement **au-dessus d’un simple “guide interne”**.

Avec les ajouts :

* Signals
* Performance
* Architecture
* Tests
* Sécurité

👉 vous obtenez un **véritable Angular Playbook de niveau entreprise**.

Si tu veux, au prochain message je peux :

* t’aider à **rédiger une section complète (ex : Signals ou Performance)**
* ou te faire une **checklist Angular officielle prête à coller dans Confluence**







import { BapiStore } from '@bpce/ng-subscription-services/bapi/store';
import {DigitalParameters} from '../../models/digital-parameters'
import { NeoShimmeringComponent } from "@bpce/neo-ng/shimmering";
import { TrackingService } from '@bpce/ng-subscription-services/tracking';
import { SAISIE_PART_PAGE_DATALAYER } from '@app/constants/tracking/tracking.constant';
import {ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, Signal, signal,} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NeoTextHelperComponent} from '@bpce/neo-ng/text-helper';
import {InformationPromptLayoutComponent} from '@bpce/ng-subscription-ui/information-prompt-layout';
import {NeoButtonComponent, NeoButtonGroupComponent,} from '@bpce/neo-ng/button';
import {NeoSliderComponent, NeoSliderThumbLabelFunction,} from '@bpce/neo-ng/slider';
import {SAISIE_PARTS_WORDING} from '@app/constants/wording/saisie-parts-wording.constant';
import {NeoCardComponent} from '@bpce/neo-ng/card';
import {NeoDialogModule, NeoDialogService} from '@bpce/neo-ng/dialog';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';
import {switchMap, tap} from 'rxjs';
import {PdfViewModalComponent} from '../modals/pdf-view-modal/pdf-view.modal.component';
import {UpdateAmountModalComponent} from '../modals/update-amount-modal/update-amount.modal.component';
import {NeoInputAmountComponent} from '@bpce/neo-ng/input-amount';
import {StepRouteEnum} from '@app/routes';
import {Router} from '@angular/router';
import {BapiStoreService} from '@app/services/store/bapi.store.service';
import {NestedKeys, WordingPipe, WordingUtils,} from '@bpce/ng-subscription-ui/utils';
import {CurrencyPipe} from '@angular/common';
import {InputStoreService} from '@app/services/store/input.store.service';

@Component({
  selector: 'app-saisie-parts',
  templateUrl: './saisie-parts.component.html',
  styleUrl: './saisie-parts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    InformationPromptLayoutComponent,
    NeoButtonComponent,
    NeoButtonGroupComponent,
    NeoSliderComponent,
    NeoTextHelperComponent,
    ReactiveFormsModule,
    NeoCardComponent,
    NeoDialogModule,
    NeoInputAmountComponent,
    WordingPipe,
    CurrencyPipe,
    NeoShimmeringComponent
],
})
export class SaisiePartsComponent implements OnInit {
  ngOnInit(): void {
     this.trackPage();
  }
  protected displayHelper: boolean = false;
    protected showShimmering : boolean = false ; 

  protected helperKey: NestedKeys<typeof SAISIE_PARTS_WORDING> =
    'form.helper.infoAmount';
  protected helperAmount: number = 0;
  protected rawInputValue: number = 0;

  readonly template = SAISIE_PARTS_WORDING;
  private readonly trackingService = inject(TrackingService);
  private readonly neoDialog = inject(NeoDialogService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly bapiStore = inject(BapiStoreService);
  private readonly inputStore = inject(InputStoreService);
  private readonly bapiStoreParam : BapiStore<DigitalParameters> = inject(BapiStore)
  protected showValue: boolean = false;
  readonly isInputFocused = signal(false);
  readonly shareData = computed(() => {
    const condition = this.bapiStore.conditionSocialShare.value();
    const selectedAccount = this.bapiStore.selectedAccount();
    const shareAmount = this.bapiStore.shareAmount();

    if (condition && selectedAccount) {
      return {
        shareAmount: shareAmount,
        miniAmount:
          condition.characteristics.minimumShareNumber *
          selectedAccount.shareAmount.value,
        maxAmount: condition.characteristics.remainingAmountToInvest.value,
        minParts: condition.characteristics.minimumShareNumber,
        maxParts: Math.floor(
          condition.characteristics.remainingAmountToInvest.value /
            selectedAccount.shareAmount.value,
        ),
      };
    }
    return undefined;
  });

  readonly selectedShareAmount = signal(0);
  protected supportsPdfViewer: boolean = navigator.pdfViewerEnabled;
  public readonly formatLabel = computed<NeoSliderThumbLabelFunction>(() => {
    const sufix = '€';
    return (value: number): string => `${value} ${sufix}`;
  });

  precision = computed(() => {
    const data = this.shareData();
    if (
      data !== undefined &&
      Number.isInteger(this.selectedShareAmount() * data.shareAmount) &&
      !this.isInputFocused()
    ) {
      return 0;
    }
    return 2;
  });
  public readonly getNoticeLink = computed(() => {
    return this.bapiStoreParam.digitalParameters.value()?.links
      .technicalNoticeLink;
  });


  readonly formGroup = new FormGroup({
    input: new FormControl<any>(this.shareData()?.miniAmount, [
      Validators.required,
    ]),
  });

  readonly formValue = toSignal(this.formGroup.valueChanges, {
    initialValue: this.formGroup.value,
  });
  readonly formStatus = toSignal(this.formGroup.events);

  get inputValue(): number {
    return this.formGroup.get('input')?.value || this.shareData()?.miniAmount;
  }

  set inputValue(value: number | null) {
    const data = this.shareData();
    if (value !== null && data !== undefined) {
      const finalValue = this.closestShareNumberfromAmount(value);
      this.displayHelper = false;
      this.formGroup.get('input')?.markAsDirty();
    }
  }

  onValueChange(_$event: any) {
    this.showShimmering = false
    let value = this.formGroup.get('input')?.value;
    this.getHelpers(value);
    this.isInputFocused.set(false);
    const data = this.shareData();
    if (value && data !== undefined) {
      value = this.closestShareNumberfromAmount(value);
      const lowerMultiple =
        Math.floor(value / data.shareAmount) * data.shareAmount;
      const upperMultiple =
        Math.ceil(value / data.shareAmount) * data.shareAmount;
      const closestMultiple =
        value - lowerMultiple < upperMultiple - value
          ? lowerMultiple
          : upperMultiple;

      if (value !== closestMultiple) {
        this.formGroup.get('input')?.setValue(closestMultiple);
      }

      this.displayHelper = !(data && (this.rawInputValue >= data.miniAmount && this.rawInputValue <= data.maxAmount));
      this.isInputFocused.set(false);

    }
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.rawInputValue = parseFloat(inputElement.value);
  }

    onInput(event:any){
     this.showShimmering = true ; 
  }


  getHelpers(value: number) {
    if (value > this.shareData()!.maxAmount) {
      this.helperAmount = this.shareData()!.maxAmount;
      this.helperKey = 'form.helper.infoAmountMax';
    } else if (value < this.shareData()!.miniAmount) {
      this.helperAmount = this.shareData()!.miniAmount;
      this.helperKey = 'form.helper.infoAmountMin';
    } else {
      this.helperAmount = this.shareData()!.shareAmount;
      this.helperKey = 'form.helper.inputErreur';
    }
  }

  openDefault(): void {
    this.neoDialog
      .open(PdfViewModalComponent)
      .pipe(
        switchMap((ref) => ref.afterClose()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  continue() {
    const data = this.shareData();
    if (data) {
      if (this.formGroup.get('input')?.value > data.maxAmount) {
        this.neoDialog
          .open(UpdateAmountModalComponent, {
            data: {
              maximumAllowedAmount: data.maxAmount,
              maximumAllowedParts: data.maxParts,
            },
          })
          .pipe(
            switchMap((ref) => ref.afterClose()),
            tap(() => this.updateFunds()),
            takeUntilDestroyed(this.destroyRef),
          )
          .subscribe();
      } else {
        if (this.selectedShareAmount() < data.minParts) {
          this.selectedShareAmount.set(data.minParts);
        } else if (this.selectedShareAmount() > data.maxParts) {
          this.selectedShareAmount.set(data.maxParts);
        }

        this.inputStore.setShareNumberSelected(this.selectedShareAmount());
        this.router.navigate([StepRouteEnum.QUESTION_INTRO]);
      }
    }
  }

  updateFunds(): void {
    const data = this.shareData();
    if (data) {
      this.formGroup.get('input')?.setValue(data.maxAmount);
      this.displayHelper = true;
    }
  }


 readonly  description = signal( 
    WordingUtils.applyWording('header.description',this.template ,  {SHARE_AMOUNT:this.shareData()?.shareAmount} ),
  );

   getTitle(): NestedKeys<typeof SAISIE_PARTS_WORDING> {
    if (!this.formStatus()) {
      return 'header.title.default';
    }
    if (this.formValue().input) {
      this.showValue = true;
      return this.showShimmering ? 'header.title.editedShimmering':'header.title.edited';
    }
     else
      {
      this.showValue = false;
      return 'header.title.default';
    }
  }

 trackPage() {
    this.trackingService.trackPage(SAISIE_PART_PAGE_DATALAYER);
  }
  private closestShareNumberfromAmount(value: number): number {
    const data = this.shareData();
    let finalValue = value;
    if (value && data !== undefined) {
      if (value > data.maxAmount) {
        this.displayHelper = true;
        finalValue = data.maxAmount;
      } else if (value < data.miniAmount) {
        this.displayHelper = true;
        finalValue = data.miniAmount;
      }
      this.formGroup.get('input')?.setValue(finalValue);

      this.selectedShareAmount.set(Math.floor(finalValue / data.shareAmount));
    }
    return finalValue;
  }
}
@if ((formGroup.get('input')?.dirty || formGroup.get('input')?.touched) && showValue === true) {
<p class="amount">{{inputValue | currency: 'EUR' : 'symbol' : '1.2-2'}} </p>
}
@if(showShimmering){
    <div class="shimmering">
    <pre>Soit </pre>
        <neo-shimmering [shape]="'line'" aria-label="Chargement en cours" class="shimmering-data-line" />
    <pre> parts sociales</pre>
    </div>
}
<lib-information-prompt-layout 
[title]="getTitle() | wording : {wording : template ,replacement : {MAX_AMOUNT : selectedShareAmount()} }" 
[description]="description()">
    <div class="container">
      
        <form [formGroup]="formGroup">
                    <neo-input-amount [size]="'l'" 
                    [precision]="precision()" 
                     (blur)="onValueChange($event)" (input)="onInput($event)"  
                     (focus)="isInputFocused.set(true)" class="neo-slider-with-input"
                    formControlName="input" label="Montant" #input>
                    @if (displayHelper === true) {
                    <neo-text-helper type="warning" [iconAriaLabel]="'warning'">{{ helperKey | wording : {wording:template ,replacement : {HELPER_AMOUNT: helperAmount | currency: 'EUR' : 'symbol' : '1.2-2'} }  }}</neo-text-helper>
                    } @else {
                        <neo-text-helper type="default" [iconAriaLabel]="'default'">{{ 'form.helper.infoAmount' | wording : {wording:template ,replacement : {SHARE_AMOUNT: shareData()?.shareAmount | currency: 'EUR' : 'symbol' : '1.2-2'} }  }}</neo-text-helper>   
                    }
                </neo-input-amount>
        </form>

    <neo-slider
      [min]="shareData()?.miniAmount || 0"
      [step]="shareData()?.shareAmount || 0"
      (valueChange)="inputValue = $event"
      [precision]="2"
      [minLabel]="' '"
      [max]="shareData()?.maxAmount || 0"
      [maxLabel]="' '"
      [value]="inputValue"
      [ariaLabel]="''"
    >
    </neo-slider>

        <div class="helpers">
            <neo-text-helper type="default">{{ shareData()?.miniAmount | currency: 'EUR' : 'symbol' : '1.2-2'}}</neo-text-helper>
            <neo-text-helper type="default">{{ shareData()?.maxAmount | currency: 'EUR' :'symbol' : '1.2-2'}}</neo-text-helper>
            <neo-text-helper type="default">{{ 'form.helper.shareSlider' |  wording : {wording:template ,replacement : {NUMBER_SHARE: shareData()?.minParts} } }}</neo-text-helper>
            <neo-text-helper type="default">{{ 'form.helper.shareSlider' |  wording : {wording:template ,replacement : {NUMBER_SHARE: shareData()?.maxParts} } }}</neo-text-helper>
        </div>

    <div neoCard>
      <div class="slot-content">
        <p class="info-title">{{ template.infobox.title }}</p>
        <p class="bullet">{{ template.infobox.bullet1 }}</p>
        @if (supportsPdfViewer) {
          <button
            class="download"
            neoButton
            [variant]="'secondary-outline'"
            [iconPosition]="'right'"
            [icon]="'download'"
            aria-haspopup="dialog"
            (click)="openDefault()"
          >
            {{ template.infobox.download }}
          </button>
        } @else {
          <a
            class="download"
            neoButton
            [iconPosition]="'right'"
            [variant]="'secondary-outline'"
            [icon]="'download'"
            [href]="getNoticeLink()"
          >
            {{ template.infobox.download }}
          </a>
        }
        <p class="bullet">{{ template.infobox.bullet2 }}</p>
      </div>
    </div>
  </div>
  <div cta>
    <div neoButtonGroup [alignment]="'block'">
      <button neoButton alignment="block" (click)="continue()">
        {{ template.action }}
      </button>
    </div>
  </div>
</lib-information-prompt-layout>

