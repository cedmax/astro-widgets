# Astro Widgets

A set of Netlify ready widgets, just to be configured via the appropriate env variables when building.


[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cedmax/astro-widgets)


## Last.fm

A widget to show the most listened to track, album or artist in a period of time for a given user.

Built on `/lastfm`.

![](./lastfm-example.png)

### Configuration

| Environment Variable  | Default         | Description |
| --------------------- | --------------- | ----------- |
| LASTFM_API_KEY        | _(mandatory)_   | [Follow the instructions on Last.fm](https://www.last.fm/api/account/create) |
| LASTFM_USER           | _(mandatory)_   | |
| LASTFM_ENTITY         | `track`         | Options available: `track`, `album`, `artist` |
| LASTFM_TIMEFRAME      | `7day`          | Options available: `overall`, `7day`, `1month`, `3month`, `6month`, `12month` |
| PUBLIC_LASTFM_BGCOLOR | `#a8302c`       | Any color in any css digestible format, the font color will change according to contrast needs |
