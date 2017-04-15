'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _rssFeedPoller = require('./rss-feed-poller');

var _rssFeedPoller2 = _interopRequireDefault(_rssFeedPoller);

var _configParser = require('./config-parser.js');

var _configParser2 = _interopRequireDefault(_configParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(robot) {
        var config;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        // This will be loaded from a config file
                        config = void 0;
                        _context.prev = 1;
                        _context.next = 4;
                        return (0, _configParser2.default)(process.env.HUBOT_RSS_CONFIG_FILE || 'hubotrssconfig.json');

                    case 4:
                        config = _context.sent;

                        config = JSON.parse(config);

                        config.feeds.map(function (x) {
                            var feed = (0, _rssFeedPoller2.default)((0, _extends3.default)({}, x, { robot: robot }));
                            return feed;
                        }).forEach(function (x) {
                            return x.startFeed();
                        });
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](1);

                        robot.logger.debug(_context.t0.message);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this, [[1, 9]]);
    }));

    function rssPoller(_x) {
        return _ref.apply(this, arguments);
    }

    return rssPoller;
}();

module.exports = exports['default'];