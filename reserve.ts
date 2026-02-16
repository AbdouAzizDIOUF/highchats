@if ((form.controls.input.dirty || form.controls.input.touched) && form.controls.input.value !== null) {
  <p class="amount">{{ form.controls.input.value | currency:'EUR':'symbol':'1.2-2' }}</p>
}

@if (isShimmering()) {
  <div class="shimmering">
    <pre>Soit </pre>
    <neo-shimmering shape="line" aria-label="Chargement en cours" class="shimmering-data-line" />
    <pre> parts sociales</pre>
  </div>
}

<lib-information-prompt-layout
  [title]="titleKey() | wording : {wording : template, replacement : {MAX_AMOUNT : selectedParts()} }"
  [description]="description()"
>
  <div class="container">
    <form [formGroup]="form">
      <neo-input-amount
        class="neo-slider-with-input"
        formControlName="input"
        label="Montant"
        [size]="'l'"
        [precision]="precision()"
        (focus)="isInputFocused.set(true)"
        (blur)="onBlurNormalize()"
        (input)="onInput()"
      >
        <neo-text-helper
          [type]="helperKey() === 'form.helper.infoAmount' ? 'default' : 'warning'"
          [iconAriaLabel]="helperKey() === 'form.helper.infoAmount' ? 'default' : 'warning'"
        >
          {{ helperKey() | wording : {wording: template, replacement: {HELPER_AMOUNT: helperAmount() | currency:'EUR':'symbol':'1.2-2', SHARE_AMOUNT: constraints()?.shareAmount | currency:'EUR':'symbol':'1.2-2'} } }}
        </neo-text-helper>
      </neo-input-amount>
    </form>

    <neo-slider
      [min]="constraints()?.minAmount || 0"
      [max]="constraints()?.maxAmount || 0"
      [step]="constraints()?.shareAmount || 0"
      [value]="form.controls.input.value || 0"
      [precision]="2"
      [minLabel]="' '"
      [maxLabel]="' '"
      [ariaLabel]="''"
      (valueChange)="onSliderChange($event)"
    >
    </neo-slider>

    <div class="helpers">
      <neo-text-helper type="default">{{ constraints()?.minAmount | currency:'EUR':'symbol':'1.2-2' }}</neo-text-helper>
      <neo-text-helper type="default">{{ constraints()?.maxAmount | currency:'EUR':'symbol':'1.2-2' }}</neo-text-helper>

      <neo-text-helper type="default">
        {{ 'form.helper.shareSlider' | wording : {wording: template, replacement: {NUMBER_SHARE: constraints()?.minParts} } }}
      </neo-text-helper>

      <neo-text-helper type="default">
        {{ 'form.helper.shareSlider' | wording : {wording: template, replacement: {NUMBER_SHARE: constraints()?.maxParts} } }}
      </neo-text-helper>
    </div>

    <div neoCard>
      <div class="slot-content">
        <p class="info-title">{{ template.infobox.title }}</p>
        <p class="bullet">{{ template.infobox.bullet1 }}</p>

        @if (supportsPdfViewer) {
          <button
            class="download"
            neoButton
            variant="secondary-outline"
            iconPosition="right"
            icon="download"
            aria-haspopup="dialog"
            (click)="openNotice()"
          >
            {{ template.infobox.download }}
          </button>
        } @else {
          <a
            class="download"
            neoButton
            variant="secondary-outline"
            iconPosition="right"
            icon="download"
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
    <div neoButtonGroup alignment="block">
      <button neoButton alignment="block" (click)="continue()">
        {{ template.action }}
      </button>
    </div>
  </div>
</lib-information-prompt-layout>

