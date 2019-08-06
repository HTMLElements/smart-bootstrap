# [Bootstrap Web Components](https://www.htmlelements.com)[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Get%20over%2020%20free%20custom%20elements%20based%20on%20SmartHTMLElements%20&url=https://www.htmlelements.com/&via=htmlelements&hashtags=bootstrap,design,templates,autocomplete,bootstrap-components,typeahead,developers,webcomponents,customelements,polymer,material)


&nbsp;
[![Price](https://img.shields.io/badge/price-FREE-0098f7.svg)](https://github.com/HTMLElements/Bootstrap-Web-Components/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/bootstrap-webcomponents.svg?style=flat)](https://www.npmjs.com/package/bootstrap-webcomponents)
[![GitHub package version](https://img.shields.io/github/package-json/v/HTMLElements/Bootstrap-Web-Components.svg)](https://github.com/HTMLElements/Bootstrap-Web-Components)
[![License: APACHE](https://img.shields.io/badge/license-APACHE-blue.svg)](https://github.com/HTMLElements/Bootstrap-Web-Components/blob/master/LICENSE)
[![](https://img.shields.io/website-up-down-green-red/https/shields.io.svg?label=www.htmlelements.com)](https://www.htmlelements.com)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/htmlelements/bootstrap-webcomponents)

# &lt;Bootstrap Web Components&gt;

[Installation ↗](https://www.npmjs.com/package/bootstrap-webcomponents)

The package contains a set of Free Custom Elements based on the popular Boostrap library. 

[Demo ↗](https://www.htmlelements.com/demos/bootstrap/)


```html
Bootstrap Buttons
<bootstrap-button style-mode="primary">Primary</bootstrap-button>
<bootstrap-button style-mode="secondary">Secondary</bootstrap-button>
<bootstrap-button style-mode="success">Success</bootstrap-button>
<bootstrap-button style-mode="danger">Danger</bootstrap-button>
<bootstrap-button style-mode="warning">Warning</bootstrap-button>
<bootstrap-button style-mode="info">Info</bootstrap-button>
<bootstrap-button style-mode="light">Light</bootstrap-button>
<bootstrap-button style-mode="dark">Dark</bootstrap-button>
<bootstrap-button style-mode="link">Link</bootstrap-button>
```

```html
Bootstrap CheckBox
<bootstrap-check-box checked>Checked</bootstrap-check-box>
<bootstrap-check-box>Unchecked</bootstrap-check-box>
```

```html
Bootstrap RadioButton
<bootstrap-radio-button checked> Active</bootstrap-radio-button>
<bootstrap-radio-button>Radio</bootstrap-radio-button>
<bootstrap-radio-button>Radio</bootstrap-radio-button>
```

```html
Bootstrap DropDown
<bootstrap-drop-down label="Dropdown button">
	<a class="dropdown-item" href="#">Action</a>
	<a class="dropdown-item" href="#">Another action</a>
	<a class="dropdown-item" href="#">Something else here</a>
</bootstrap-drop-down>
```

```html
Bootstrap Split Buttons
<bootstrap-split-button label="Dropdown button">
	<a class="dropdown-item" href="#">Action</a>
	<a class="dropdown-item" href="#">Another action</a>
	<a class="dropdown-item" href="#">Something else here</a>
</bootstrap-split-button>
```

```html
	Bootstrap Input Groups
	<bootstrap-input-group class="mb-3">
		<span class="input-group-text" id="basic-addon1">@</span>
		<input type="text" class="form-control" placeholder="Username" aria-label="Username"
			aria-describedby="basic-addon1">
	</bootstrap-input-group>
	<bootstrap-input-group class="mb-3">
		<input type="text" class="form-control" placeholder="Recipient's username"
			aria-label="Recipient's username" aria-describedby="basic-addon2">
		<span class="input-group-text" id="basic-addon2">@example.com</span>
	</bootstrap-input-group>
	<label for="basic-url">Your vanity URL</label>
	<bootstrap-input-group class="mb-3">
		<span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
	</bootstrap-input-group>
	<bootstrap-input-group class="mb-3">
		<span class="input-group-text">$</span>
		<input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
		<span class="input-group-text">.00</span>
	</bootstrap-input-group>
	<bootstrap-input-group>
		<span class="input-group-text">With textarea</span>
		<textarea class="form-control" aria-label="With textarea"></textarea>
	</bootstrap-input-group>
```

```html
Bootstrap Modals
<bootstrap-modal id="exampleModalLive" class="fade">
	<div class="modal-header">
		<h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
		<button type="button" class="close" data-dismiss="modal" aria-label="Close">
			<span aria-hidden="true">&times;</span>
		</button>
	</div>
	<div class="modal-body">
		<p>Modal body text goes here.</p>
	</div>
	<div class="modal-footer">
		<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		<button type="button" class="btn btn-primary">Save changes</button>
	</div>
</bootstrap-modal>
```
[<img src="https://raw.githubusercontent.com/htmlelements/Bootstrap-Web-Components/master/Bootstrap.png" alt="Screenshot of Bootstrap, Elements">](https://htmlelements.com/demos/)


## The file structure for Smart HTML Elements

- `src/`

  Javascript files.

- `src/styles/`

  Component CSS Files.

- `example/`

  Example files

## Running demos in browser

1. Fork the repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the directory, run `npm install` 

1. Run a localhost or upload the demo on a web server. Then run:

  - /example/


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting JavaScript code. 

## Creating a pull request

  - Make sure your code is compliant with ESLint
  - [Submit a pull request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github) with detailed title and description
  - Wait for response from one of our team members


## License

Apache License 2.0
