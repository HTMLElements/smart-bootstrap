Smart('bootstrap-button', class Button extends Smart.ContentElement {
	// Button's properties.
	static get properties() {
		return {
			'value': {
				type: 'string'
			},
			'name': {
				type: 'string'
			},
			'type': {
				type: 'string'
			},
			'styleMode': {
				value: 'primary',
				type: 'string'
			},
			'outlined': {
				value: false,
				type: 'boolean'
			},
			'sizeMode': {
				value: '',
				allowedValue: ['lg', 'sm', ''],
				type: 'string'
			}
		};
	}

	/** Button's template. */
	template() {
		return '<button inner-h-t-m-l=\'[[innerHTML]]\' id=\'button\' type=\'[[type]]\' name=\'[[name]]\' value=\'[[value]]\' disabled=\'[[disabled]]\' role=\'button\'></button>';
	}

	ready() {
		const that = this;

		that.render();
	}

	render() {
		const that = this;

		that.$.button.className = 'btn';

		if (that.outlined) {
			that.$.button.classList.add('btn-outline-' + that.styleMode);
		}
		else {
			that.$.button.classList.add('btn-' + that.styleMode);
		}

		if (that.sizeMode !== '') {
			that.$.button.classList.add('btn-' + that.sizeMode);
		}
	}

	propertyChangedHandler(propertyName, oldValue, newValue) {
		const that = this;

		that.render();
	}
});

Smart('bootstrap-check-box', class CheckBox extends Smart.ContentElement {
	// Button's properties.
	static get properties() {
		return {
			'checked': {
				value: false,
				type: 'boolean'
			},
			'name': {
				type: 'string'
			},
			'styleMode': {
				value: 'secondary',
				type: 'string'
			}
		};
	}

	/**
	* CheckBox's Event Listeners
	*/
	static get listeners() {
		return {
			'click': 'toggle',
			'input.focus': 'focus',
			'input.blur': 'blur'
		};
	}

	/** CheckBox's template. */
	template() {
		return `<label id="button" class="btn">
				 	<input id="input" type="checkbox" name=\'[[name]]\' autocomplete="off"/>
				 	<content></content>
			   </label>`;
	}

	ready() {
		const that = this;

		if (!(that instanceof Smart.ToggleButton)) {
			that.classList.add('btn-group-toggle');
		}

		that.$.button.classList.add('btn-' + that.styleMode);

		if (that.checked) {
			that.$.button.classList.add('active');
		}
		else {
			that.$.button.classList.remove('active');
		}
	}

	propertyChangedHandler(propertyName, oldValue, newValue) {
		const that = this;

		if (propertyName === 'checked') {
			that.toggle();
		}
	}

	toggle(event) {
		const that = this;
		const input = that.querySelector('input');

		if (event) {
			event.preventDefault()
		}

		if (that.disabled) {
			return;
		}

		if (that.checked) {
			that.$.button.classList.remove('active');
			that.checked = false;
		}
		else {
			that.$.button.classList.add('active');
			that.checked = true;
		}

		that.$.fireEvent('change');
		input.focus();
	}

	dispose() {
		const that = this;

		if (that.parentElement) {
			that.parentElement.removeChild(that);
		}
	}

	blur() {
		this.$.button.classList.remove('focus');
	}

	focus() {
		this.$.button.classList.add('focus');
	}
});

Smart('bootstrap-toggle-button', class ToggleButton extends Smart.CheckBox {
	// Button's properties.
	static get properties() {
		return {
			'styleMode': {
				value: 'primary',
				type: 'string'
			}
		};
	}

	/** CheckBox's template. */
	template() {
		return `<button id="button" type="button" class="btn" autocomplete="off">
					<content></content>
		  		</button>`;
	}

	/**
	* CheckBox's Event Listeners
	*/
	static get listeners() {
		return {
			'click': 'toggle',
			'button.focus': 'focus',
			'button.blur': 'blur'
		};
	}

	toggle(event) {
		const that = this;

		if (event) {
			event.preventDefault()
		}

		if (that.disabled) {
			return;
		}


		if (that.checked) {
			if (that instanceof Smart.RadioButton) {
				that.$.button.focus();
				return;
			}

			that.$.button.classList.remove('active');
			that.set('checked', false);
		}
		else {
			if (that instanceof Smart.RadioButton) {
				const buttons = document.querySelectorAll('bootstrap-radio-button');

				for (let i = 0; i < buttons.length; i++) {
					if (buttons[i].group === that.group) {
						buttons[i].set('checked', false);
						buttons[i].$.button.classList.remove('active');
					}
				}
			}

			that.$.button.classList.add('active');
			that.set('checked', true);
		}

		that.$.fireEvent('change');
		that.$.button.focus();
		that.$.button.setAttribute('area-pressed', that.checked);
	}
});

Smart('bootstrap-radio-button', class RadioButton extends Smart.ToggleButton {
	// Button's properties.
	static get properties() {
		return {
			'styleMode': {
				value: 'secondary',
				type: 'string'
			},
			'group': {
				value: '',
				type: 'string'
			}
		};
	}
});

Smart('bootstrap-drop-down', class DropDown extends Smart.ContentElement {

	// DropDown's properties.
	static get properties() {
		return {
			'checked': {
				value: false,
				type: 'boolean'
			},
			'styleMode': {
				value: 'secondary',
				type: 'string'
			},
			'label': {
				value: '',
				type: 'string'
			},
			'opened': {
				value: false,
				type: 'boolean'
			},
			'dropDownPosition': {
				allowedValues: ['auto', 'top', 'bottom', 'overlay-top', 'overlay-center', 'overlay-bottom', 'center-bottom', 'center-top'],
				value: 'auto',
				type: 'string'
			},
			'sizeMode': {
				value: '',
				allowedValue: ['lg', 'sm', ''],
				type: 'string'
			}
		};
	}

	/**
	* CheckBox's Event Listeners
	*/
	static get listeners() {
		return {
			'document.click': '_clearMenus',
			'document.keyup': '_clearMenus',
			'button.keydown': '_dataApiKeydownHandler',
			'button.click': '_clickHandler',
			'dropDownContainer.click': '_clickHandler',
			'keydown': '_dataApiKeydownHandler'
		};
	}

	propertyChangedHandler(propertyName, oldValue, newValue) {
		const that = this;

		if (propertyName === 'styleMode') {
			that.$.button.classList.remove('btn-' + oldValue);
			that.$.button.classList.add('btn-' + newValue);
		}
		else if(propertyName === 'sizeMode') {
			that.$.button.classList.remove('btn-' + oldValue);
			that.$.button.classList.add('btn-' + newValue);
		}
		else if (propertyName === 'dropDownPosition') {
			that._positionDetection.dropDownPositionChangedHandler();
		}
	}

	/** CheckBox's template. */
	template() {
		return `<div class="dropdown" id="container">
					<button id="button" class="btn dropdown-toggle" data-toggle="dropdown">[[label]]</button>
					<div id="dropDownContainer" class="dropdown-menu"><content></content></div>
				</div>`;
	}

	ready() {
		const that = this;

		that.ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
		that.SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key
		that.TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key
		that.ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
		that.ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
		that.RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)
		that.REGEXP_KEYDOWN = new RegExp(`${that.ARROW_UP_KEYCODE}|${that.ARROW_DOWN_KEYCODE}|${that.ESCAPE_KEYCODE}`);

		if (!that.dropDownAppendTo) {
			that.dropDownAppendTo = that.$.container;
		}

		that._positionDetection = new Smart.Utilities.PositionDetection(that, that.$.dropDownContainer, that.$.container, 'hide');
		that._positionDetection.getDropDownParent(true);
		that._positionDetection.setDropDownPosition();
		// that._calculateDropDownSize();
		that._positionDetection.handleAutoPositioning();

		that.$.button.classList.add('btn-' + that.styleMode);
		that.$.button.classList.add('btn-' + that.sizeMode);

		if (that.opened) {
			that.$.dropDownContainer.classList.add('show');
			that.$.container.classList.add('show');
			that.opened = true;
		}
	}

	// Public
	toggle() {
		const that = this;

		if (that.disabled || that.classList.contains('disabled')) {
			return
		}

		const isHidden = !that.opened;

		that._clearMenus();

		if (isHidden) {
			that.show();
		}

		// Disable totally Popper.js for Dropdown in Navbar
		if (!that.closest('.navbar')) {
			/**
			 * Check for Popper dependency
			 * Popper - https://popper.js.org
			 */
			// if (typeof Popper === 'undefined') {
			// 	throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)')
			// }

		}

		// If this is a touch-enabled device we add extra
		// empty mouseover listeners to the body's immediate children;
		// only needed because of broken event delegation on iOS
		// https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html
		// if ('ontouchstart' in document.documentElement &&
		// 	parent.closest(that.Selector.NAVBAR_NAV).length === 0) {
		// 	// $(document.body).children().on('mouseover', null, $.noop);
		// 	document.addEventListener('mouseover', null, that._mouseoverNoop);
		// }

	}

	show() {
		const that = this;

		if (that.disabled || that.classList.contains('disabled') || that.$.dropDownContainer.classList.contains('show')) {
			return
		}

		const isDefaultPrevented = that.$.fireEvent('show').defaultPrevented;

		if (isDefaultPrevented) {
			return
		}

		that.setAttribute('aria-expanded', true);

		that.$.dropDownContainer.classList.add('show');
		that.$.container.classList.add('show');
		that.opened = true;

		that._positionDetection.checkBrowserBounds('vertically');
		that._positionDetection.positionDropDown();
		that._positionDetection.checkBrowserBounds('horizontally');

		that.$.dropDownContainer.setAttribute('x-placement', that._dropDownListPosition + '-start');

		that.$.fireEvent('shown');

		that.$.button.focus();
	}

	hide() {
		const that = this;

		if (that.disabled || that.classList.contains('disabled') || !that.$.dropDownContainer.classList.contains('show')) {
			return
		}

		const isDefaultPrevented = that.$.fireEvent('hide').defaultPrevented;

		if (isDefaultPrevented) {
			return
		}

		that.removeAttribute('aria-expanded', true);

		that.$.dropDownContainer.classList.remove('show');
		that.$.container.classList.remove('show');
		that.opened = false;

		that.$.fireEvent('hidden');

		that.$.button.focus()
	}

	dispose() {
		const that = this;

		if (that.parentElement) {
			that.parentElement.removeChild(that);
		}
	}

	_dataApiKeydownHandler(event) {
		const that = this;

		if (/input|textarea/i.test(event.target.tagName)
			? event.which === that.SPACE_KEYCODE || event.which !== that.ESCAPE_KEYCODE &&
			(event.which !== that.ARROW_DOWN_KEYCODE && event.which !== that.ARROW_UP_KEYCODE ||
				event.target.closest('.dropdown-menu')) : !that.REGEXP_KEYDOWN.test(event.which)) {
			return
		}

		event.preventDefault()
		event.stopPropagation()

		if (this.disabled || that.classList.contains('disabled')) {
			return
		}

		const isActive = that.opened;

		if (!isActive || isActive && (event.which === that.ESCAPE_KEYCODE || event.which === that.SPACE_KEYCODE)) {
			if (event.which === that.ESCAPE_KEYCODE) {
				that.$.button.focus(event);
			}


			that._clickHandler(event);
			return
		}

		const items = [].slice.call(that.querySelectorAll('.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'));

		if (items.length === 0) {
			return
		}

		let index = items.indexOf(event.target)

		if (event.which === that.ARROW_UP_KEYCODE && index > 0) { // Up
			index--;
		}

		if (event.which === that.ARROW_DOWN_KEYCODE && index < items.length - 1) { // Down
			index++;
		}

		if (index < 0) {
			index = 0
		}

		items[index].focus()
	}

	_clickHandler(event) {
		event.preventDefault();
		event.stopPropagation();

		this.toggle();
	}

	_getParentFromElement(element) {
		return element.closest('bootstrap-drop-down');
	}

	_clearMenus(event) {
		const that = this;

		if (event && (event.which === that.RIGHT_MOUSE_BUTTON_WHICH ||
			event.type === 'keyup' && (event.which !== that.TAB_KEYCODE && event.which !== that.ESCAPE_KEYCODE))) {
			return
		}

		const toggles = [].slice.call(document.querySelectorAll('.dropdown-menu'))

		for (let i = 0, len = toggles.length; i < len; i++) {
			const parent = toggles[i].closest('bootstrap-drop-down');

			if (!parent) {
				continue;
			}

			const dropdownMenu = parent.$.dropDownContainer;

			if (!parent.opened) {
				continue
			}

			if (event && (event.type === 'click' &&
				/input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === that.TAB_KEYCODE) &&
				parent.contains(event.target)) {
				continue
			}

			const isDefaultPrevented = that.$.fireEvent('hide').defaultPrevented;

			if (isDefaultPrevented) {
				return
			}

			// If this is a touch-enabled device we remove the extra
			// empty mouseover listeners we added for iOS support
			// if ('ontouchstart' in document.documentElement) {
			// 	$(document.body).children().off('mouseover', null, $.noop)
			// }

			parent.setAttribute('aria-expanded', 'false');
			parent.$.container.classList.remove('show');
			parent.opened = false;
			dropdownMenu.classList.remove('show');

			parent.$.fireEvent('hidden');
		}
	}
});