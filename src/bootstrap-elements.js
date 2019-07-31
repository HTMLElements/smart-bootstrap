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
				allowedValues: ['auto', 'top', 'bottom', 'left', 'right'],
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


		if (propertyName === 'styleMode' || propertyName === 'sizeMode') {
			that.$.button.classList.remove('btn-' + oldValue);
			that.$.button.classList.add('btn-' + newValue);

			if (that.$.actionButton) {
				that.$.actionButton.classList.remove('btn-' + oldValue);
				that.$.actionButton.classList.add('btn-' + newValue);
			}
		}
		else if (propertyName === 'dropDownPosition') {
			that._positionDetection.dropDownPositionChangedHandler();
			that._setArrowPosition();
		}
		else if (propertyName === 'opened') {
			newValue ? that.show() : that.hide();
		}
	}

	/** CheckBox's template. */
	template() {
		return `<div class="dropdown btn-group" id="container">
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
		that._positionDetection.customPositionDropDown = that._customPositionDropDown.bind(that);

		that._setArrowPosition();


		that.$.button.classList.add('btn-' + that.styleMode);

		if (that.sizeMode) {
			that.$.button.classList.add('btn-' + that.sizeMode);
		}

		if (that.$.actionButton) {
			that.$.actionButton.classList.add('btn-' + that.styleMode);

			if (that.sizeMode) {
				that.$.actionButton.classList.add('btn-' + that.sizeMode);
			}
		}

		if (that.opened) {
			that.$.dropDownContainer.classList.add('show');
			that.$.container.classList.add('show');
			that.set('opened', true);
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
		that.set('opened', true);

		that._positionDetection.checkBrowserBounds('vertically');
		that._positionDetection.positionDropDown();
		that._positionDetection.checkBrowserBounds('horizontally');

		that.$.dropDownContainer.setAttribute('x-placement', that._dropDownListPosition + '-start');

		that.$.fireEvent('shown');

		that.$.button.focus();
	}

	_setArrowPosition() {
		const that = this;

		that.$.container.classList.remove('dropup');
		that.$.container.classList.remove('dropleft');
		that.$.container.classList.remove('dropright');

		if (that.dropDownPosition !== 'auto') {
			switch (that._dropDownListPosition) {
				case 'top':
					that.$.container.classList.add('dropup');
					break;
				case 'right':
					that.$.container.classList.add('dropright');
					break;
				case 'left':
					that.$.container.classList.add('dropleft');
					break;
			}
		}

		if (that._repositionButtons) {
			that._repositionButtons();
		}
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
		that.set('opened', false);

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
			const parent = toggles[i].closest('bootstrap-drop-down') || toggles[i].closest('bootstrap-split-button');

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

			parent.setAttribute('aria-expanded', 'false');
			parent.$.container.classList.remove('show');
			parent.set('opened', false);
			dropdownMenu.classList.remove('show');

			parent.$.fireEvent('hidden');
		}
	}

	_customPositionDropDown() {
		const that = this,
			coordinates = that.$[that instanceof Smart.SplitButton ? 'button' : 'container'].getBoundingClientRect(),
			dropDown = that.$.dropDownContainer;
		let top = coordinates.top,
			left = coordinates.left;

		switch (that._dropDownListPosition) {
			case 'bottom':
				top = coordinates.bottom;
				break;
			case 'top':
				top = coordinates.top - dropDown.offsetHeight;
				break;
			case 'left':
				top = coordinates.top;
				left -= dropDown.offsetWidth;
				break;
			case 'right':
				top = coordinates.top;
				left += coordinates.width;
				break;
		}

		return { left: left, top: top };
	}
});

Smart('bootstrap-split-button', class SplitButton extends Smart.DropDown {

	/** CheckBox's template. */
	template() {
		return `<div class="dropdown btn-group" id="container">
					<div id="buttonGroup" class="btn-group"></div>
					<button id="actionButton" class="btn">[[label]]</button>
					<button id="button" class="btn dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"></button>
					<div id="dropDownContainer" class="dropdown-menu"><content></content></div>
					</div>
				</div>`;
	}

	_repositionButtons() {
		const that = this,
			actionButton = that.$.actionButton,
			dropDown = that.$.dropDownContainer,
			button = that.$.button,
			container = that.$.container,
			buttonGroup = that.$.buttonGroup;

		//Reset
		actionButton.parentElement.removeChild(actionButton);
		button.parentElement.removeChild(button);
		dropDown.parentElement.removeChild(dropDown);

		container.appendChild(actionButton);
		container.appendChild(button);
		container.appendChild(dropDown);

		if (that.dropDownPosition === 'left' && !buttonGroup.contains(button)) {
			buttonGroup.appendChild(button);
			buttonGroup.appendChild(dropDown);
		}
		else if (that.dropDownPosition === 'right' && !buttonGroup.contains(actionButton)) {
			buttonGroup.appendChild(actionButton);
		}
	}
});