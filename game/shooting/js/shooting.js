var countdown = (function() {
	var wait = 30;

	return function($target) {
		wait--;
		$target.text(wait);

		if (wait !== 0) {
			setTimeout(function() {
				countdown($target);
			}, 1e3);
		} else {
			Music.stop();
			Shoot.end();
		}

		if (wait === 10) {
			gameLevelConf(1);
		} else if (wait === 20) {
			gameLevelConf(2);
		}
	};
})();

function gameLevelConf(lev) {
	Shoot.setGameLevel(lev);
	slider.setSpeed(lev);
	gameBgToggle(lev);
}

var gameBgToggle = (function() {
	var url2 = './images/level-2.png',
		url3 = './images/level-3.png';

	var $levelBg = $('.shoot-container .level .bc');

	return function (level) {
		var src = level == 2 ? url2 : url3;

		$levelBg.attr('src', src);
	}
})();

var slider = (function () {
	var $slider = $('#slider');
	var level = 3;

	function start() {
		var speed = 0;

		switch (level) {
			case 3:
				speed = 3000;
				break;
			case 2:
				speed = 2000;
				break;
			case 1:
				speed = 1000;
				break;
		}

		$slider.animate({
			left: 178
		}, speed, function() {
			$(this).animate({
				left: 0
			}, speed, function() {
				start();
			});
		});
	}

	function setSpeed(lev) {
		level = lev;
	}

	return {
		start: start,
		setSpeed: setSpeed
	}
})();

var scoreHandler = (function () {
	var $countContainer = $('.shoot-container .score-wrap .count'),
		$scoreText      = $countContainer.find('.num span');

	return function (score) {
		$scoreText.text(score);

		$countContainer.show().animate({
			'marginTop': 0,
			'opacity': 0
		}, 1000, function () {
			$countContainer.hide().css({
				'marginTop': 15,
				'opacity': 1
			});
		});
	};
})();

var Shoot = (function () {
	var $slider     = $('#slider'),
		$basketball = $('#shooting'),
		$projection = $('.projection'),
		$shootArrs  = $('.start-btn img'),
		$readyImgs  = $('.ready-countdown img'),
		$basket     = $('.shoot-container .basket');

	var gameLevel = tiemCount = 3, scoreCount = 0;

	var winWidth   = $(window).width();
	var winHeight  = $(window).height();

	var bstOffsetT = 0;
	var bstState1  = winWidth / 2 + winHeight * 0.0325;
	var bstState2  = winWidth / 2.8;

	var noGoalState1 = 0;
	var noGoalState2 = bstState1 - 20;
	var noGoalState3 = winWidth / 4;
	var noGoalState4 = winWidth / 5;
	var noGoalState5 = winWidth / 7;

	var noGoalState6 = bstState1 + 20;
	var noGoalState7 = winWidth / 4 * 3.1;
	var noGoalState8 = winWidth / 4 * 3.3;
	var noGoalState9 = winWidth / 4 * 3.7;

	var shootInstance;

	function start() {
		if (tiemCount > 0) {
			tiemCount--;

			$readyImgs.eq(tiemCount).show(0,function(){$readyImgs.fadeOut(1500)});

			if (tiemCount !== 0) {
				setTimeout(start, 1500);
			} else {
				setTimeout(function () {
					$shootArrs.eq(0).hide().end().eq(1).show();
					shootInstance = new Shoot($shootArrs.eq(1));

					slider.start();
					countdown($('#countdown'));
				}, 1000);
			}
		}
	}

	function end () {
		$slider.stop(true);
		shootInstance.end();

		console.log('game over, scre: ' + scoreCount);

		setTimeout(function() {
			alert('得分: ' + scoreCount + '分');
			window.location.reload();
		}, 1000);
	}

	function Shoot($selector) {
		this.$selector = $selector;
		this.bind();
	}

	Shoot.setter = function(lev) {
		gameLevel = lev;
	};

	Shoot.prototype.bind = function() {
		var self = this;

		self.$selector.on('touchend', function() {
			var offset = parseInt($slider.css('left'));

			/* 如果 bstOffsetT 已经赋值直接跳过此步骤 */
			if (!bstOffsetT) {
				bstOffsetT   = parseInt($('.shoot-container .basket').css('top'));
				noGoalState1 = bstOffsetT + winHeight * 0.05;
			}

			self.$selector.off('touchend');
			self.move(offset);
		});
	};

	Shoot.prototype.move = function(offset) {
		/* level-1 yellow => 0 ~ 30, green => 30 ~ 73,  red =>  73 ~ 178; */
		/* level-2 yellow => 0 ~ 51, green => 51 ~ 112, red => 112 ~ 178; */
		/* level-3 yellow => 0 ~ 66, green => 66 ~ 148, red => 148 ~ 178; */
		var scope1, scope2, scope3 = 178, score = 1;

		if (gameLevel == 2) {
			scope1 = 51;
			scope2 = 112;
			score  = 2;
		} else if (gameLevel == 1) {
			scope1 = 30;
			scope2 = 73;
			score  = 3;
		} else {
			scope1 = 66;
			scope2 = 148;
		}

		if (offset < scope1) {
			this.noGoalLeft();
		} else if (offset > scope1 && offset < scope2) {
			this.makeGoal(score);
		} else if (offset > scope2 && offset < scope3) {
			this.noGoalRight();
		}

		$projection.hide(300);
	};

	Shoot.prototype.makeGoal = function(score) {
		var self = this;

		var val1 = 'url(./images/basket-1.png)',
			val2 = 'url(./images/basket-2.png)',
			val3 = 'url(./images/basket-3.png)';

		scoreCount += score;
		setTimeout(function(){scoreHandler(score)}, 800);

		this.updateBasketNet(val2, 900);
		this.updateBasketNet(val3, 1100);
		this.updateBasketNet(val1, 1200);

		$basketball.animate({
			'width': '8vh',
			'height': '8vh',
			'top':  [bstOffsetT, 'easeOutQuart'],
			'left': bstState1
		}, 600, function() {
			$basketball.animate({
				'top': '60%',
				'left': bstState1 + Util.rand(1, 5)
			}, 350, function() {
				$basketball.animate({
					'top': '45%',
					'left': bstState1 + Util.rand(1, 5)
				}, 175, function() {
					$basketball.animate({
						'top': ['67%', 'easeOutBounce'],
						'left': bstState2
					}, 600, function() {
						self.reset();
					});
				});
			});
		});
	};

	Shoot.prototype.updateBasketNet = function(val, timer) {
		setTimeout(function () {
			$basket.css({'background-image': val});
		}, timer);
	};

	Shoot.prototype.noGoalLeft = function() {
		var self = this;

		$basketball.animate({
			'width': '8vh',
			'height': '8vh',
			'top':  [noGoalState1, 'easeOutQuart'],
			'left': noGoalState2
		}, 600, function() {
			$basketball.animate({
				'top': ['65%', 'easeInCubic'],
				'left': noGoalState3
			}, 280, function() {
				$basketball.animate({
					'top': '55%',
					'left': noGoalState4
				}, 200, function() {
					$basketball.animate({
						'top': ['67%', 'easeOutBounce'],
						'left': noGoalState5
					}, 500, function() {
						self.reset();
					});
				});
			});
		});
	};

	Shoot.prototype.noGoalRight = function() {
		var self = this;

		$basketball.animate({
			'width': '8vh',
			'height': '8vh',
			'top':  [noGoalState1, 'easeOutQuart'],
			'left': noGoalState6
		}, 600, function() {
			$basketball.animate({
				'top': ['63%', 'easeInCubic'],
				'left': noGoalState7
			}, 280, function() {
				$basketball.animate({
					'top': '55%',
					'left': noGoalState8
				}, 200, function() {
					$basketball.animate({
						'top': ['67%', 'easeOutBounce'],
						'left': noGoalState9
					}, 500, function() {
						self.reset();
					});
				});
			});
		});
	};

	Shoot.prototype.reset = function() {
		$basketball.hide().css({
			'width': '20vw',
			'height': '20vw',
			'top': '65%',
			'left': '50%',
			'marginLeft': '-10vw'
		}).show();

		$projection.show();
		this.bind();
	};

	Shoot.prototype.end = function() {
		this.$selector.off('touchend');
	};

	return {
		start: start,
		end: end,
		setGameLevel: Shoot.setter
	}
})();

var Music = (function() {
	var dom = document.querySelector('.shoot-container .music');

	var timeout, rotate = 0;

	var music = new Audio('./bgm/dou.mp3');

	function player() {
		rotateHandler();
		music.play();
	}

	function stop() {
		music.pause();

		clearInterval(timeout);
		timeout = null;
	}

	function rotateHandler() {
		timeout = setInterval(function() {
			var rotateStyle = 'rotate(' + rotate + 'deg)';

			dom.style.transform = rotateStyle;
			dom.style['-moz-transform']    = rotateStyle;
			dom.style['-webkit-transform'] = rotateStyle;
			dom.style['-o-transform']      = rotateStyle;
			dom.style['-ms-transform']     = rotateStyle;

			rotate += 3;
			if (rotate > 360) {rotate = 0}

		}, 30);
	}

	return {
		player: player,
		stop: stop
	}
})();