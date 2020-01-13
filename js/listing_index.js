; (function () {
	'use strict';

	var userAgent = navigator.userAgent;

	var setHash = function (hashName, value) {
		var hashs = location.hash.split('#'),
			hashLength = hashs.length - 1,
			varName;

		for (var i = 0; i <= hashLength; i++) {
			varName = hashs[i].split('=');

			if (varName[0].toUpperCase() === hashName.toUpperCase()) {
				varName[1] = value;
				hashs[i] = varName.join('=');
				break;
			} else if (i === hashLength) {
				hashs.push(hashName + '=' + value);
			};
		};

		location.hash = hashs.join('#');
	};

	var getHash = function (hashName) {
		var hashs = location.hash.split('#'),
			returnValue, varName;

		for (var i = 0; i < hashs.length; i++) {
			varName = hashs[i].split('=')[0];

			if (varName.toUpperCase() === hashName.toUpperCase()) {
				returnValue = hashs[i].split('=')[1];

				return decodeURIComponent(returnValue);
			};
		};
	};

	var listing = {
		$: $('#wrapper'),
		init: function () {
			this.initValues();
			this.initElement();
			this.bindEvents();
		},
		initValues: function () {
			this.isMobile = $('body').hasClass('is_mobile');
			this.normalCoordinate = {};
			this.upperPathURL = 'main_path.json';
			this.listItemHTML = ['<li><a href="', '#isOpenMenu=true" data-select="true">', '#isOpenMenu=true">', '</a></li>'];
			this.className = {
				drag: 'is_drag',
				open: 'is_open'
			}
			this.scale = {
				w: 0,
				h: 0,
				defaultW: 377,
				defaultH: 640
			};
		},
		initElement: function () {
			this.$header = this.$.find('#header');
			this.$upperList = this.$.find('#nav-upper');
			this.$list = this.$.find('#nav');
			this.$listItem = this.$.find('#nav li a');
			this.$title = this.$.find('#page-title');
			this.$viewer = this.$.find('#page-viewer');
			this.$viewerSize = this.$.find('#page-size');
			this.$linker = this.$.find('#page-url');
			this.$desc = this.$.find('#page-desc');
			this.$qrcode = new QRCode("page-qrcode");
			this.$buttonUpperOpen = this.$.find('#button-open');
			this.$buttonUpperClose = this.$.find('#button-close');
			this.$buttonResizer = this.$.find('#button-resize');
			this.$dummyDimmed = this.$.find('#dummy-dimmed');

			this.setUpperMenuList();
			this.setItemIndex();
			this.setDisplayPage();
		},
		bindEvents: function () {
			if (!this.isMobile) {
				this.$list.on('click', 'a', $.proxy(this.updatePage, this));
				this.$list.on('click', '.txt-code', $.proxy(this.updatePage, this));
			};
			this.$buttonUpperOpen.on('click', $.proxy(this.openUpperMenu, this));
			this.$buttonUpperClose.on('click', $.proxy(this.closeUpperMenu, this));
			this.$buttonResizer.on('mousedown', $.proxy(this.startResizeView, this));
			this.$buttonResizer.on('dblclick', $.proxy(this.returnInitialSize, this));
		},
		/******************************************************************/
		/* 메뉴                                                            */
		/******************************************************************/
		openUpperMenu: function () {
			this.$header.addClass(this.className.open);
			this.$buttonUpperClose.focus();
			setHash('isOpenMenu', true);
		},
		closeUpperMenu: function () {
			this.$header.removeClass(this.className.open);
			this.$buttonUpperOpen.focus();
			setHash('isOpenMenu', false);
		},
		setUpperMenuList: function () {
			var that = this;

			$.ajax({
				url: that.upperPathURL,
				success: function (data) {
					var upperListItem = that.genUpperMenuItem(data.list),
						isOpenMenu = getHash('isOpenMenu');

					if (isOpenMenu === 'true') {
						that.$header.addClass(that.className.open)
					};

					that.$upperList.html(upperListItem);
				}
			});
		},
		genUpperMenuItem: function (data) {
			var index, dummyEl = '';

			for (var i = 0; i < data.length; i++) {
				index = (location.href.search(data[i].url) >= 0) ? 1 : 2;
				dummyEl += this.listItemHTML[0] + data[i].url + this.listItemHTML[index] + data[i].name + this.listItemHTML[3];
			};

			return dummyEl;
		},
		setItemIndex: function () {
			for (var i = this.$listItem.length - 1; i >= 0; i--) {
				this.$listItem[i].setAttribute('data-index', i);
			};
		},
		setDisplayPage: function () {
			var index = getHash('index');
			var length = this.$listItem.length;

			for (var i = 0; i < length; i++) {
				if (this.$listItem[i].getAttribute('data-index') == index) {
					this.updatePageView(this.$listItem[i]);
					break;
				};
			};
		},
		/******************************************************************/
		/* 페이지 업데이트                                                 */
		/******************************************************************/
		updatePage: function (e) {
			e.preventDefault();
			this.updatePageView(e.currentTarget);
		},
		updatePageView: function (element) {
			this.setCurrentItem(element);

			this.$title.text(this.current.textContent);
			this.$linker.text(this.current.href);
			this.$linker.attr('href', this.current.href);
			this.$viewer.attr('src', this.current.href);
			this.$qrcode.makeCode(this.current.href);
			this.$desc.html(this.current.desc);
			this.updateViewSize();

			setHash('index', this.current.getAttribute('data-index'));
		},
		setCurrentItem: function (element) {
			this.prev = this.current || undefined;

			if (element.hasAttribute('href')) {
				this.current = element;
			} else {
				this.current = $(element).siblings('a')[0];
			};

			this.current.desc = this.getDescription(this.current.getAttribute('data-desc'));

			if (this.prev !== undefined) {
				this.prev.removeAttribute('data-select');
			};

			this.current.setAttribute('data-select', true);
		},
		getCurrentItem: function () {
			return this.current;
		},
		getDescription: function (target) {
			var descText = $(target).html();

			return (descText == '' || descText == undefined) ? '-' : descText;
		},
		updateViewSize: function () {
			var width = this.$viewer.width(),
				hegith = this.$viewer.height();

			this.$viewerSize.html('W: ' + width + '(' + (width - 17) + ') / H: ' + hegith);
		},
		/******************************************************************/
		/* 뷰어 리사이즈                                                   */
		/******************************************************************/
		startResizeView: function (e) {
			this.normalCoordinate.x = e.pageX;
			this.normalCoordinate.y = e.pageY;

			this.$dummyDimmed.addClass(this.className.drag);

			$(document).on('mousemove.resizing', $.proxy(this.resizeView, this));
			$(document).on('mouseup', $.proxy(this.stopResizeView, this));
		},
		stopResizeView: function (e) {
			$(e.currentTarget).off('mousemove.resizing');
			this.$dummyDimmed.removeClass(this.className.drag);
		},
		resizeView: function (e) {
			var moveValue = this.operationMoveValue(e.pageX, e.pageY);

			this.scale.w = this.$viewer.width() + moveValue.x;
			this.scale.h = this.$viewer.height() + moveValue.y;

			if (this.scale.w >= 337) {
				this.$viewer.width(this.scale.w);
			};

			if (this.scale.h >= 480) {
				this.$viewer.height(this.scale.h);
			};

			this.normalCoordinate.x = e.pageX;
			this.normalCoordinate.y = e.pageY;

			this.updateViewSize();
		},
		operationMoveValue: function (posX, posY) {
			posX -= this.normalCoordinate.x;
			posY -= this.normalCoordinate.y;

			return { x: posX, y: posY };
		},
		returnInitialSize: function () {
			this.$viewer.width(this.scale.defaultW);
			this.$viewer.height(this.scale.defaultH);
			this.updateViewSize();
		}
	};

	if (userAgent.match(/iPhone|iPod|iPad|iPad2|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		$('body').addClass('is_mobile');
	};

	listing.init();
})();
