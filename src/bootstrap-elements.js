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
				value: '',
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
