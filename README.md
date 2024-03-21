# Astro Widgets

A set of Netlify ready widgets, just to be configured via the appropriate env variables when building.


[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cedmax/astro-widgets)

## Scheduling

There's a scheduled function executing every Monday at midnight.
If you add a [Netlify build hook](https://docs.netlify.com/configure-builds/build-hooks/) in the env, the widgets will be updated.
If you need a different scheduling you can either use something like [EasyCron](https://www.easycron.com/) or fork the repo.

| Environment Variable  | Description | 
| --------------------- | ----------- | 
| `BUILD_HOOK`            | Netlify Build Hook URL | 


## Services

### Last.fm

A widget to show the most listened to track, album or artist in a period of time for a given user.

```
<iframe 
  src="{YOUR_NETLIFY_DOMAIN}/lastfm" 
  style="width:384px;border:0;height:80px;outline:0" 
  frameborder="0"
  scrolling="no"
/>
```

<img src="/public/lastfm-example.png" alt="last.fm widget example" width="384" />

#### Configuration

| Environment Variable    | Default         | Description |
| ----------------------- | --------------- | ----------- |
| `LASTFM_API_KEY`        | _(mandatory)_   | [Follow the instructions on Last.fm](https://www.last.fm/api/account/create) |
| `LASTFM_USER`           | _(mandatory)_   | |
| `LASTFM_ENTITY`         | `track`         | Options available: `track`, `album`, `artist` |
| `LASTFM_TIMEFRAME`      | `7day`          | Options available: `overall`, `7day`, `1month`, `3month`, `6month`, `12month` |
| `PUBLIC_LASTFM_BGCOLOR` | `#a8302c`       | Any color in any css digestible format, the font color will change according to contrast needs |

### Strava

A widget to show the distance ran/swam/cycled in a given period of time for the user.

**N.B.**
This implementation won't rely on a full OAuth but on an hardcoded refresh token. 
This, as per the OAuth design, means the build could fail at any time if the refresh_token changes.

```
<iframe 
  src="{YOUR_NETLIFY_DOMAIN}/strava" 
  style="width:320px;border:0;height:80px;outline:0" 
  frameborder="0"
  scrolling="no"
/>
```

<img src="/public/strava-example.png" alt="last.fm widget example" width="320" />

#### Configuration

| Environment Variable    | Default               | Description |
| ----------------------- | --------------------- | ----------- |
| `STRAVA_CLIENT`         | _(mandatory)_         | [Follow the instructions on Strava](https://developers.strava.com/docs/getting-started/#account) |
| `STRAVA_SECRET`         | _(mandatory)_         |  |
| `STRAVA_REFRESH_TOKEN`  | _(mandatory)_         |  |
| `STRAVA_TYPE`           | `run`                 | Options available: `run`, `ride`, `swim` |
| `STRAVA_TIMEFRAME`      | `ytd`                 | Options available: `ytd` (_year to date_), `recent` (_last month_), `all` |
| `STRAVA_UNIT`           | `km`                  | Options available: `km`, `miles` |
| `PUBLIC_STRAVA_BGCOLOR` | `#e95f29`             | Any color in any css digestible format, the font color will change according to contrast needs |
