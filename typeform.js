/**
 * Typeform Component — Metodo Zero
 * Formulario conversacional estilo TypeForm, sem custos.
 *
 * Uso: adicione [data-typeform] no container principal.
 * Requer: isValidEmail() de script.js estar disponivel globalmente.
 */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-typeform]').forEach(el => new Typeform(el));
});

class Typeform {
  constructor(container) {
    this.container = container;
    this.steps = Array.from(container.querySelectorAll('[data-step]'));
    this.currentIndex = 0;
    this.answers = {};

    this.progressBar = container.querySelector('.typeform-progress-bar');
    this.btnPrev = container.querySelector('[data-tf-prev]');
    this.btnNext = container.querySelector('[data-tf-next]');

    this._init();
  }

  _init() {
    // Mostra o primeiro step diretamente (sem _showStep para evitar early return)
    if (this.steps[0]) {
      this.steps[0].classList.add('active');
    }
    this._updateProgress();

    // Botoes "OK" dentro dos steps
    this.container.querySelectorAll('[data-tf-btn-next]').forEach(btn => {
      btn.addEventListener('click', () => this.next());
    });

    // Choices (multipla escolha)
    this.container.querySelectorAll('[data-tf-choice]').forEach(choice => {
      choice.addEventListener('click', () => this._handleChoice(choice));
    });

    // Setas de navegacao fixas
    this.btnPrev?.addEventListener('click', () => this.prev());
    this.btnNext?.addEventListener('click', () => this.next());

    // Teclado
    document.addEventListener('keydown', e => this._handleKey(e));
  }

  /* ------------------------------------------
     NAVEGACAO
  ------------------------------------------ */

  next() {
    if (!this._validate()) return;
    this._collectAnswer();

    const nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.steps.length) {
      this._submit();
      return;
    }

    this._showStep(nextIndex, 'next');
    this._updateProgress();
    this._updateNav();
  }

  prev() {
    if (this.currentIndex === 0) return;
    this._showStep(this.currentIndex - 1, 'prev');
    this._updateProgress();
    this._updateNav();
  }

  /* ------------------------------------------
     ANIMACAO DOS STEPS
  ------------------------------------------ */

  _showStep(index, direction) {
    const current = this.steps[this.currentIndex];
    const next = this.steps[index];
    if (!next || next === current) return;

    // Sai o atual
    if (current) {
      const exitClass = direction === 'next' ? 'exit-up' : 'exit-down';
      current.classList.remove('active');
      current.classList.add(exitClass);
      setTimeout(() => current.classList.remove(exitClass, 'exit-up', 'exit-down'), 500);
    }

    // Entra o proximo
    const enterClass = direction === 'next' ? 'enter-next' : 'enter-prev';
    next.classList.add(enterClass);

    // Forca reflow para garantir a transicao
    next.getBoundingClientRect();

    next.classList.remove(enterClass);
    next.classList.add('active');
    this.currentIndex = index;

    // Foca o primeiro input interativo do step
    setTimeout(() => {
      const focusable = next.querySelector('.typeform-input, .typeform-choice, [data-tf-btn-next]');
      focusable?.focus({ preventScroll: true });
    }, 80);
  }

  /* ------------------------------------------
     CHOICES
  ------------------------------------------ */

  _handleChoice(choice) {
    const step = choice.closest('[data-step]');
    const isMultiple = step.hasAttribute('data-multiple');
    const errorEl = step.querySelector('.typeform-error');

    if (errorEl) errorEl.classList.remove('visible');

    if (isMultiple) {
      choice.classList.toggle('selected');
    } else {
      step.querySelectorAll('[data-tf-choice]').forEach(c => c.classList.remove('selected'));
      choice.classList.add('selected');
      // Auto-avanca em escolha unica
      setTimeout(() => this.next(), 360);
    }
  }

  /* ------------------------------------------
     VALIDACAO
  ------------------------------------------ */

  _validate() {
    const step = this.steps[this.currentIndex];
    if (!step) return true;

    // Input de texto / email / tel
    const input = step.querySelector('.typeform-input[required]');
    if (input) {
      const error = step.querySelector('.typeform-error');
      input.classList.remove('error');
      error?.classList.remove('visible');

      if (!input.value.trim()) {
        input.classList.add('error');
        this._showError(error, 'Este campo é obrigatório.');
        input.focus();
        return false;
      }

      if (input.type === 'email' && !this._isValidEmail(input.value)) {
        input.classList.add('error');
        this._showError(error, 'Digite um e-mail válido.');
        input.focus();
        return false;
      }
    }

    // Choices (data-required no step)
    if (step.hasAttribute('data-required')) {
      const selected = step.querySelector('[data-tf-choice].selected');
      const error = step.querySelector('.typeform-error');
      if (!selected) {
        this._showError(error, 'Selecione uma opção para continuar.');
        return false;
      }
    }

    return true;
  }

  _showError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visible');
  }

  /* ------------------------------------------
     COLETA DE RESPOSTAS
  ------------------------------------------ */

  _collectAnswer() {
    const step = this.steps[this.currentIndex];
    if (!step) return;

    // Input de texto
    const input = step.querySelector('.typeform-input');
    if (input?.name) {
      this.answers[input.name] = input.value;
    }

    // Choices selecionadas
    const selected = Array.from(step.querySelectorAll('[data-tf-choice].selected'));
    if (selected.length) {
      const name = step.getAttribute('data-name') || `step_${this.currentIndex + 1}`;
      this.answers[name] = selected.map(c => c.getAttribute('data-value')).join(', ');
    }
  }

  /* ------------------------------------------
     PROGRESS BAR
  ------------------------------------------ */

  _updateProgress() {
    if (!this.progressBar) return;
    const pct = (this.currentIndex / this.steps.length) * 100;
    this.progressBar.style.width = pct + '%';
  }

  /* ------------------------------------------
     NAVEGACAO (setas)
  ------------------------------------------ */

  _updateNav() {
    if (this.btnPrev) this.btnPrev.disabled = this.currentIndex === 0;
  }

  /* ------------------------------------------
     TECLADO
  ------------------------------------------ */

  _handleKey(e) {
    const step = this.steps[this.currentIndex];
    if (!step) return;

    // Enter avanca (exceto em textarea)
    if (e.key === 'Enter' && !e.shiftKey) {
      const active = document.activeElement;
      if (active?.tagName === 'TEXTAREA') return;
      // Nao interferir com choices (o click ja lida)
      if (active?.hasAttribute('data-tf-choice')) return;
      e.preventDefault();
      this.next();
    }

    // Atalhos A/B/C/D para choices
    const key = e.key.toUpperCase();
    if (['A', 'B', 'C', 'D'].includes(key)) {
      const choices = step.querySelectorAll('[data-tf-choice]');
      const idx = ['A', 'B', 'C', 'D'].indexOf(key);
      if (choices[idx]) choices[idx].click();
    }
  }

  /* ------------------------------------------
     SUBMISSAO
  ------------------------------------------ */

  async _submit() {
    // Coleta resposta do ultimo step
    this._collectAnswer();

    const form = this.container.querySelector('form[data-tf-form]');

    if (!form) {
      // Sem form Netlify: mostra tela de obrigado direto
      this._showEndScreen('[data-tf-end]');
      return;
    }

    // Preenche campos ocultos com as respostas coletadas
    Object.entries(this.answers).forEach(([name, value]) => {
      let hidden = form.querySelector(`input[name="${name}"]`);
      if (!hidden) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = name;
        form.appendChild(hidden);
      }
      hidden.value = value;
    });

    // Envia via Netlify Forms
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });

      if (res.ok) {
        // Tracking
        if (typeof fbq === 'function') fbq('track', 'Lead');
        if (typeof dataLayer !== 'undefined') {
          dataLayer.push({
            event: 'generate_lead',
            form_name: form.getAttribute('name') || 'typeform',
            method: 'typeform'
          });
        }

        // Redirect ou tela de obrigado
        const redirect = form.getAttribute('data-redirect');
        if (redirect) {
          const url = new URL(redirect, window.location.origin);
          new URLSearchParams(window.location.search).forEach((v, k) => url.searchParams.set(k, v));
          if (this.answers.nome) url.searchParams.set('nome', this.answers.nome);
          if (this.answers.email) url.searchParams.set('email', this.answers.email);
          window.location.href = url.toString();
        } else {
          this._showEndScreen('[data-tf-end]');
        }
      } else {
        this._showEndScreen('[data-tf-error]');
      }
    } catch {
      this._showEndScreen('[data-tf-error]');
    }
  }

  /* ------------------------------------------
     TELAS DE FIM
  ------------------------------------------ */

  _showEndScreen(selector) {
    const current = this.steps[this.currentIndex];
    if (current) {
      current.classList.remove('active');
      current.classList.add('exit-up');
      setTimeout(() => current.classList.remove('exit-up'), 500);
    }

    const screen = this.container.querySelector(selector);
    if (screen) {
      setTimeout(() => {
        screen.classList.remove('enter-next');
        screen.getBoundingClientRect();
        screen.classList.add('active');
      }, 200);
    }

    // Esconde navegacao
    this.container.querySelector('.typeform-nav')?.remove();
    this.container.querySelector('.typeform-progress')?.remove();
  }

  /* ------------------------------------------
     UTILITARIOS
  ------------------------------------------ */

  _isValidEmail(email) {
    // Usa a funcao global do script.js se disponivel
    if (typeof isValidEmail === 'function') return isValidEmail(email);
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
