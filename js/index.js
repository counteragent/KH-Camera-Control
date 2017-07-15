
var camera_ip = "192.168.0.190";
var base_url = "http://" + camera_ip + "/cgi-bin";
// config defaults
var defaults = {
    ip: camera_ip,
    flip: 1,
    mirror: 1,
    invertcontrols: 1,
    infinitypt: 0,
    infinityzoom: 0,
    infinityfocus: 0,
    panspeed: 8,
    zoomspeed: 5,
    tiltspeed: 8,
    focusspeed: 3,
    autopaninterval: 60,
};
var config = defaults;
config.ip = camera_ip;

function get_config () {
	var result = localStorage.getItem('configStorage');
  if (!result) {
    return config;
  } else {
  	return JSON.parse(result);
  }
}

function save_config () {
	localStorage.setItem('configStorage', JSON.stringify(config));
	console.log(config);
}

function run_action (action_url) {
	// $.get(url);
	$.ajax({
		url: action_url,
		type: 'GET',
	})
	.done(function() {
		// console.log("success");
	})
	.fail(function(jqXHR, responseText, errorThrown) {
		// console.log("error");
	})
	.always(function() {
		// console.log("complete");
	});
}

// setup all the initial configuration and standard settings
function config_init () {

  config = get_config();
	console.log(config);

	// set the initial IP value for the camera ip input
	$("#cam_ip").val(config.ip);
	base_url = "http://" + config.ip + "/cgi-bin";

	// set the camera's initial configuration for each value in the saved config object
	config_setting("flip", config.flip);
	config_setting("mirror", config.mirror);
	config_setting("invertcontrols", config.invertcontrols);
	config_setting("infinitypt", config.infinitypt);
	config_setting("infinityzoom", config.infinityzoom);
	config_setting("infinityfocus", config.infinityfocus);

	// set the initial values for each select dropdown
	$("#panspeed").val(config.panspeed);
	$("#zoomspeed").val(config.zoomspeed);
	$("#tiltspeed").val(config.tiltspeed);
	$("#focusspeed").val(config.focusspeed);
	$("#autopaninterval").val(config.autopaninterval);

	// save_config();

	if (config.infinitypt == 1) {
		$('#pt_infinity').show();
	} else {
		$('#pt_infinity').hide();
	}

	if (config.infinityzoom == 1) {
		$('#cam_zoom_infinity').show();
		$('#cam_zoom_standard').hide();
	} else {
		$('#cam_zoom_infinity').hide();
		$('#cam_zoom_standard').show();
	}

	if (config.infinityfocus == 1) {
		$('#cam_focus_infinity').show();
		$('#cam_focus_standard').hide();
	} else {
		$('#cam_focus_infinity').hide();
		$('#cam_focus_standard').show();
	}

	update_labels();
}

config_init();

function config_setting (action, value) {
	var loc = base_url + "/param.cgi?post_image_value&"+action+"&"+value;
	run_action(loc);
}

function update_labels () {

	switch (config.flip) {
		case 0:
			$('#flip').html("Flip-No");
			break;
		case 1:
			$('#flip').html("Flip-Yes");
			break;
	}

	switch (config.mirror) {
		case 0:
			$('#mirror').html("Mirror-No");
			break;
		case 1:
			$('#mirror').html("Mirror-Yes");
			break;
	}

	switch (config.invertcontrols) {
		case 0:
			$('#invertcontrols').html("Invert Controls-No");
			break;
		case 1:
			$('#invertcontrols').html("Invert Controls-Yes");
			break;
	}

	switch (config.infinitypt) {
		case 0:
			$('#infinitypt').html("Infinity Pan/Tilt-No");
			break;
		case 1:
			$('#infinitypt').html("Infinity Pan/Tilt-Yes");
			break;
	}

	switch (config.infinityzoom) {
		case 0:
			$('#infinityzoom').html("Infinity Zoom-No");
			break;
		case 1:
			$('#infinityzoom').html("Infinity Zoom-Yes");
			break;
	}

	switch (config.infinityfocus) {
		case 0:
			$('#infinityfocus').html("Infinity Focus-No");
			break;
		case 1:
			$('#infinityfocus').html("Infinity Focus-Yes");
			break;
	}

	config.ip = $('#cam_ip').val();
}

function reload_cam () {

	config.ip = $('#cam_ip').val();
	if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(config.ip)) {

		config.ip = config.ip;
		save_config();

		alert("New IP address saved.");

	} else {

		alert("IP address entered is invalid! Re-enter camera IP address.");
	}
}

function adjust_setting (action) {

	switch (action) {

		case 'flip':

			switch (config.flip) {
				case 0:
					var loc = base_url + "/param.cgi?post_image_value&flip&1";
					run_action(loc);
					config.flip = 1;
					save_config();
					update_labels();
					break;

				case 1:
					var loc = base_url + "/param.cgi?post_image_value&flip&0";
					run_action(loc);
					config.flip = 0;
					save_config();
					update_labels();
					break;
			}
			break;

		case 'mirror':
			switch (config.mirror) {
				case 0:
					var loc = base_url + "/param.cgi?post_image_value&mirror&1";
					run_action(loc);
					config.mirror = 1;
					save_config();
					update_labels();
					break;

				case 1:
					var loc = base_url + "/param.cgi?post_image_value&mirror&0";
					run_action(loc);
					config.mirror = 0;
					save_config();
					update_labels();
					break;
			}
			break;

		case 'invertcontrols':

			switch (config.invertcontrols) {
				case 0:
					config.invertcontrols = 1;
					save_config();
					update_labels();
					break;

				case 1:
					config.invertcontrols = 0;
					save_config();
					update_labels();
					break;
			}
			break;

		case 'infinitypt':

			switch (config.infinitypt) {
				case 0:
					config.infinitypt = 1;
					$('#pt_infinity').show();
					config.infinitypt = 1;
					save_config();
					update_labels();
					break;

				case 1:
					config.infinitypt = 0;
					$('#pt_infinity').hide();
					config.infinitypt = 0;
					save_config();
					update_labels();
					break;
			}
			break;

		case 'infinityzoom':

			// console.log("Adjusting Infinity Zoom", config.infinityzoom);
			switch (config.infinityzoom) {
				case 0:
					config.infinityzoom = 1;
					$('#cam_zoom_infinity').show();
					$('#cam_zoom_standard').hide();
					config.infinityzoom = 1;
					save_config();
					update_labels();
					break;

				case 1:
					config.infinityzoom = 0;
					$('#cam_zoom_infinity').hide();
					$('#cam_zoom_standard').show();
					config.infinityzoom = 0;
					save_config();
					update_labels();
					break;
			}
			break;

		case 'infinityfocus':

			switch (config.infinityfocus) {
				case 0:
					config.infinityfocus = 1;
					$('#cam_focus_infinity').show();
					$('#cam_focus_standard').hide();
					config.infinityfocus = 1;
					save_config();
					update_labels();
					break;

				case 1:
					config.infinityfocus = 0;
					$('#cam_focus_infinity').hide();
					$('#cam_focus_standard').show();
					config.infinityfocus = 0;
					save_config();
					update_labels();
					break;
			}
			break;
	}
}

// used for loading existing settings
function update_settings () {

	switch (config.flip) {

		case 0:
			var loc = base_url + "/param.cgi?post_image_value&flip&0";
			run_action(loc);
			break;

		case 1:
			var loc = base_url + "/param.cgi?post_image_value&flip&1";
			run_action(loc);
			break;
	}

	switch (config.mirror) {

		case 0:
			var loc = base_url + "/param.cgi?post_image_value&mirror&0";
			run_action(loc);
			update_labels();
			break;

		case 1:
			var loc = base_url + "/param.cgi?post_image_value&mirror&1";
			run_action(loc);
			update_labels();
			break;
	}

	switch (config.infinitypt) {

		case 0:
			$('#pt_infinity').hide();
			break;

		case 1:
			$('#pt_infinity').show();
			break;
	}

	switch (config.infinityzoom) {

		case 0:
			$('#cam_zoom_infinity').hide();
			$('#cam_zoom_standard').show();
			break;

		case 1:
			$('#cam_zoom_infinity').show();
			$('#cam_zoom_standard').hide();
			break;
	}

	switch (config.infinityfocus) {

		case 1:
			$('#cam_focus_infinity').hide();
			$('#cam_focus_standard').show();
			break;

		case 0:
			$('#cam_focus_infinity').show();
			$('#cam_focus_standard').hide();
			break;
	}

	update_labels();
}

function cam_pantilt (camera, action) {

	switch (action) {

		case 'left':

			if (config.invertcontrols == "1") {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&right&" + config.panspeed + "&" + config.tiltspeed + "";
			} else {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&left&" + config.panspeed + "&" + config.tiltspeed + "";
			}
			break;

		case 'right':

			if (config.invertcontrols == "1") {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&left&" + config.panspeed + "&" + config.tiltspeed + "";
			} else {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&right&" + config.panspeed + "&" + config.tiltspeed + "";
			}
			break;

		case 'up':

			if (config.invertcontrols == "1") {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&down&" + config.panspeed + "&" + config.tiltspeed + "";
			} else {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&up&" + config.panspeed + "&" + config.tiltspeed + "";
			}
			break;

		case 'down':

			if (config.invertcontrols == "1") {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&up&" + config.panspeed + "&" + config.tiltspeed + "";
			} else {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&down&" + config.panspeed + "&" + config.tiltspeed + "";
			}
			break;

		case 'home':

			var loc = base_url + "/ptzctrl.cgi?ptzcmd&home&" + config.panspeed + "&" + config.tiltspeed + "";
			break;

		case 'stop':

			var loc = base_url + "/ptzctrl.cgi?ptzcmd&ptzstop";
			break;
	}

	run_action(loc);
}

function cam_zoom (camera, action) {

	var loc = base_url + "/ptzctrl.cgi?ptzcmd&" + action + "&" + config.zoomspeed + "";
	run_action(loc);
}

function cam_focus (camera, action) {

	var loc = base_url + "/ptzctrl.cgi?ptzcmd&" + action + "&" + config.focusspeed + "";
	run_action(loc);
}

function cam_preset (camera, positionnum, action) {

	var loc = base_url + "/ptzctrl.cgi?ptzcmd&" + action + "&" + positionnum + "";
	run_action(loc);
}

var autoInterval;
var panInterval;
var panning;
var autopanning = false;

function autopan () {

	var seconds = config.autopaninterval;
	autopanning = true;

	// preset 11 is the autopan start preset
	cam_preset(1, 11, 'poscall');

	// wait 1 second before starting the pan
	// this should give the camera enough time to pan to start position
	setTimeout(function () {

		console.log("start panning right");
		pan('right');

		autoInterval = setInterval(function() {

			if (panning == 'left') {

				clearInterval(panInterval);
				console.log("start panning right");
				pan('right');

			} else if (panning == 'right') {

				clearInterval(panInterval);
				console.log("start panning left");
				pan('left');
			}

		}, seconds * 1000);

	}, 1000);
}

function pan (direction) {

	var panspeed = 1;
	var tiltspeed = 1;

	panInterval = setInterval(function() {

		if (direction == 'left') {

			panning = 'left';

			if (config.invertcontrols == "1") {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&right&" + panspeed + "&" + tiltspeed;
			} else {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&left&" + panspeed + "&" + tiltspeed;
			}
			console.log("...pan left");

		} else if (direction == 'right') {

			panning = 'right';

			if (config.invertcontrols == "1") {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&left&" + panspeed + "&" + tiltspeed;
			} else {
				var loc = base_url + "/ptzctrl.cgi?ptzcmd&right&" + panspeed + "&" + tiltspeed;
			}
			console.log("...pan right");
		}
		run_action(loc);

	}, 1000);
}

function stop_autopan () {
	if (autoInterval) {
		clearInterval(autoInterval);
	}
	if (panInterval) {
		clearInterval(panInterval);
	}
	autopanning = false;
	cam_pantilt(1, "stop");
	$('.autopan').removeClass('active');
}

function clear_active_preset () {
	$('.preset_button').removeClass("active");
}

$('body').on('click', '.autopan', function(e) {
	e.preventDefault();
	clear_active_preset();
	cam_pantilt(1, "stop");

	if (autopanning == false) {

		autopan();
		$(this).addClass('active');

	} else {

		stop_autopan();
	}
	return false;
});


/* ------------------------------------ Mouse Events & Clicks
 */

$('body').on('click', '.adjust_setting', function(e) {
	e.preventDefault();
	var action = $(this).data('action');
	adjust_setting(action);
	return false;
});

$('body').on('change', 'select.change_setting', function(e) {
	e.preventDefault();
	var action = $(this).attr('id');
	config[action] = $(this).val();
	save_config();
	return false;
});

$('body').on('click', '.call_preset', function(e) {
	e.preventDefault();
	stop_autopan();
	var preset = $(this).data('preset');
	cam_preset(1, preset, 'poscall');
	clear_active_preset();
	$(this).addClass("active");
	return false;
});

$('body').on('click', '.assign_preset', function(e) {
	e.preventDefault();
	var preset = $(this).val();
	if (preset == 'Auto Pan Left Start Position') {
		preset = 11;
	}
	cam_preset(1, preset, 'posset');
	return false;
});

$('body').on('click', '.reload_cam', function(e) {
	e.preventDefault();
	reload_cam();
	return false;
});

/* ------------------------------------ Keyboard Events
 */

// HOME
Mousetrap.bind('home', function(e) {
	stop_autopan();
	cam_pantilt(1, 'home');
	clear_active_preset();
	return false;
}, 'keydown');

Mousetrap.bind('home', function(e) {
	cam_pantilt(1, 'stop');
	clear_active_preset();
	return false;
}, 'keyup');

// UP
Mousetrap.bind('up', function(e) {
	stop_autopan();
	cam_pantilt(1, 'up');
	clear_active_preset();
	return false;
}, 'keydown');

Mousetrap.bind('up', function(e) {
	cam_pantilt(1, 'stop');
	clear_active_preset();
	return false;
}, 'keyup');

// DOWN
Mousetrap.bind('down', function(e) {
	stop_autopan();
	cam_pantilt(1, 'down');
	clear_active_preset();
	return false;
}, 'keydown');

Mousetrap.bind('down', function(e) {
	cam_pantilt(1, 'stop');
	clear_active_preset();
	return false;
}, 'keyup');

// LEFT
Mousetrap.bind('left', function(e) {
	stop_autopan();
	cam_pantilt(1, 'left');
	clear_active_preset();
	return false;
}, 'keydown');

Mousetrap.bind('left', function(e) {
	cam_pantilt(1, 'stop');
	clear_active_preset();
	return false;
}, 'keyup');

// RIGHT
Mousetrap.bind('right', function(e) {
	stop_autopan();
	cam_pantilt(1, 'right');
	clear_active_preset();
	return false;
}, 'keydown');

Mousetrap.bind('right', function(e) {
	cam_pantilt(1, 'stop');
	clear_active_preset();
	return false;
}, 'keyup');

// ZOOM IN
Mousetrap.bind('a', function(e) {
	stop_autopan();
	cam_zoom(1, 'zoomin');
	clear_active_preset();
	return false;
}, 'keydown');

Mousetrap.bind('a', function(e) {
	cam_zoom(1, 'zoomstop');
	return false;
}, 'keyup');

// ZOOM OUT
Mousetrap.bind('z', function(e) {
	stop_autopan();
	cam_zoom(1, 'zoomout');
	clear_active_preset();
	return false;
}, 'keydown');

Mousetrap.bind('z', function(e) {
	cam_zoom(1, 'zoomstop');
	return false;
}, 'keyup');

const {remote} = require('electron');
const {app, Menu, BrowserWindow} = remote;
const name = app.getName();

/*let win = BrowserWindow.getFocusedWindow();
let initBounds = win.getBounds();

$('#cam_adjust_control_settings, #set_presets').on('shown.bs.modal', function (e) {
	resizeWindow('show');
});

$('#cam_adjust_control_settings, #set_presets').on('hidden.bs.modal', function (e) {
	resizeWindow('hide');
});

function resizeWindow(action = 'show') {
	if (action === 'show') {
		win.setSize(480, 540);
	} else if (action === 'hide') {
		win.setSize(initBounds.width, initBounds.height);
	}
}*/

app.on('before-quit', () => {
	// reset the camera to home position before closing the application
	cam_pantilt(1, 'home');
})

const template = [
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('https://propernerd.com/kh-camera-control') }
      }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: name,
    submenu: [
      {
        role: 'about',
      },
      {
        type: 'separator'
      },
      {
        label: 'Preferences',
        accelerator: 'CmdOrCtrl+,',
          click: function() {
            $('#cam_adjust_control_settings').modal('toggle');
        },
        role: 'preferences'
      },
      {
        label: 'Presets',
        accelerator: 'CmdOrCtrl+.',
          click: function() {
            $('#set_presets').modal('toggle');
        },
      },
      {
        type: 'separator'
      },
      {
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        role: 'hide'
      },
      {
        role: 'hideothers'
      },
      {
        role: 'unhide'
      },
      {
        type: 'separator'
      },
      {
        role: 'quit'
      }
    ]
  })
  // Window menu.
  template[1].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+W',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ]
} else {
	// assume it's windows
	template.unshift({
	  label: name,
	    submenu: [
	        {
	        	role: 'about',
	        },
	        {
	          label: 'Preferences',
	          accelerator: 'CmdOrCtrl+,',
	            click: function() {
	              $('#cam_adjust_control_settings').modal('toggle');
	          },
	          role: 'preferences'
	        },
	        {
	          label: 'Presets',
	          accelerator: 'CmdOrCtrl+.',
	            click: function() {
	              $('#set_presets').modal('toggle');
	          },
	        },
	        {
	            label: 'Quit',
	            click: () => {
	                app.quit();
	            }
	        }
	    ]
	});
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)