# Astro Widgets

A set of Netlify ready widgets, just to be configured via the appropriate env variables when building.


[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cedmax/astro-widgets)


## Last.fm

A widget to show the most listened to track, album or artist in a period of time for a given user.

Built on `/lastfm`.

<img src="/lastfm-example.png" alt="last.fm widget example" width="384" />

### Configuration

| Environment Variable  | Default         | Description |
| --------------------- | --------------- | ----------- |
| LASTFM_API_KEY        | _(mandatory)_   | [Follow the instructions on Last.fm](https://www.last.fm/api/account/create) |
| LASTFM_USER           | _(mandatory)_   | |
| LASTFM_ENTITY         | `track`         | Options available: `track`, `album`, `artist` |
| LASTFM_TIMEFRAME      | `7day`          | Options available: `overall`, `7day`, `1month`, `3month`, `6month`, `12month` |
| PUBLIC_LASTFM_BGCOLOR | `#a8302c`       | Any color in any css digestible format, the font color will change according to contrast needs |

## Strava

A widget to show the distance ran/swam/cycled in a given period of time for the user.

*N.B.* 
This implementation won't rely on a full OAuth but on an hardcoded refresh token. 
This, as per the OAuth design, means the build could fail at any time if the refresh_token changes.

Built on `/strava`.

<img src="/strava-example.png" alt="last.fm widget example" width="320" />

### Configuration

| Environment Variable  | Default               | Description |
| --------------------- | --------------------- | ----------- |
| STRAVA_CLIENT         | _(mandatory)_         | [Follow the instructions on Strava](https://developers.strava.com/docs/getting-started/#account) |
| STRAVA_SECRET         | _(mandatory)_         | [Follow the instructions on Strava](https://developers.strava.com/docs/getting-started/#account) |
| STRAVA_REFRESH_TOKEN  | _(mandatory)_         | [Follow the instructions on Strava](https://developers.strava.com/docs/getting-started/#account) |
| STRAVA_TYPE           | `run`                 | Options available: `run`, `ride`, `swim` |
| STRAVA_TIMEFRAME      | `ytd`                 | Options available: `ytd` (_year to date_), `recent` (_last month_), `all` |
| STRAVA_UNIT           | `km`                  | Options available: `km`, `miles` |
| PUBLIC_STRAVA_BGCOLOR | `#e95f29`             | Any color in any css digestible format, the font color will change according to contrast needs |
