'use strict';

process.on('unhandledRejection', r => console.log(r));

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

exports.default = getFeed;

var _nodepie = require('nodepie');

var _nodepie2 = _interopRequireDefault(_nodepie);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFeed(options) {
    var checkFeed = function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var time, requestResult, feedResult, latestItem, itemPostedTime, itemTitle, lastTime, lastTitle, data;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            time = new Date().getTime();

                            options.robot.logger.debug('Checking ' + (options.name || 'unnamed feed') + ' at ' + time);

                            _context.next = 4;
                            return (0, _requestPromise2.default)(options.request);

                        case 4:
                            requestResult = _context.sent;
                            feedResult = new _nodepie2.default(requestResult);

                            if (typeof options.id === 'undefined') {
                              options.robot.logger.warning('Feed ID is not set.');
                              options.id = options.name + ': ' + options.request.uri;
                            }

                            options.messageTpl = options.messageTpl || "`${latestItem.getTitle()} - ${latestItem.getPermalink()}`";

                            try {
                                feedResult.init();
                            } catch (err) {
                                options.robot.logger.debug('' + err.message);
                            }

                            lastTime = options.robot.brain.get(`rss-poller2:${options.id}:lastTime`) || 0;
                            lastTitle = options.robot.brain.get(`rss-poller2:${options.id}:lastTitle`) || '';

                            latestItem = feedResult.getItem(0);

                            if (latestItem) {
                                itemPostedTime = latestItem.getDate();
                                itemTitle = latestItem.getTitle();

                                if (itemPostedTime >= lastTime && itemTitle != lastTitle) {
                                    options.robot.logger.debug('Found update for: ' + latestItem.getTitle());
                                    options.robot.messageRoom(options.room, eval(options.messageTpl));
                                }

                                options.robot.brain.set(`rss-poller2:${options.id}:lastTime`, latestItem.getUpdateDate());
                                options.robot.brain.set(`rss-poller2:${options.id}:lastTitle`, latestItem.getTitle());
                            }

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function checkFeed() {
            return _ref.apply(this, arguments);
        };
    }();

    function startFeed() {
        options.robot.logger.info('Starting feed poller for ' + options.name + '.');
        checkFeed();

        setInterval(checkFeed, options.pingIntervalSeconds * 1000);
    }

    return {
        checkFeed: checkFeed,
        startFeed: startFeed
    };
}
module.exports = exports['default'];
