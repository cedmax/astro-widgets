# Astro Widgets

A set of Netlify ready widgets, just to be configured via the appropriate env variables when building.


[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cedmax/astro-widgets)

## Scheduling

There's a scheduled function executing every Monday at midnight.
If you add a [Netlify build hook](https://docs.netlify.com/configure-builds/build-hooks/) in the env, the widgets will be updated.
If you need a different scheduling you can either use something like [EasyCron](https://www.easycron.com/) or fork the repo.

| Environment Variable  | Description | 
| --------------------- | ----------- | 
| `BUILD_HOOK`          | Netlify Build Hook URL | 


## Services

### [Last.fm](https://www.last.fm/)

A widget to show the most listened to track, album or artist in a period of time for a given user.

```
<iframe 
  src="{YOUR_NETLIFY_DOMAIN}/lastfm" 
  style="width:100%;max-width:384px;border:0;height:80px;outline:0" 
  frameborder="0"
  scrolling="no"
/>
```

[<img src="/public/lastfm-example.png" alt="last.fm widget example" width="384" />](https://astro-widgets.netlify.app/lastfm/)

#### Configuration

| Environment Variable    | Default         | Description |
| ----------------------- | --------------- | ----------- |
| `LASTFM_API_KEY`        | _(mandatory)_   | [Follow the instructions on Last.fm](https://www.last.fm/api/account/create) |
| `LASTFM_USER`           | _(mandatory)_   | |
| `LASTFM_ENTITY`         | `track`         | Options available: `track`, `album`, `artist` |
| `LASTFM_TIMEFRAME`      | `7day`          | Options available: `overall`, `7day`, `1month`, `3month`, `6month`, `12month` |
| `PUBLIC_LASTFM_BGCOLOR` | `#a8302c`       | Any color in any css digestible format, the font color will change according to contrast needs |

### [Strava](https://www.strava.com/)

A widget to show the distance ran/swam/cycled in a given period of time for the user.

**N.B.**
This implementation won't rely on a full OAuth but on an hardcoded refresh token. 
This, as per the OAuth design, means the build could fail at any time if the refresh_token changes.
You should receive an email from Netlify, change the ENV variable and it re-build.

```
<iframe 
  src="{YOUR_NETLIFY_DOMAIN}/strava" 
  style="width:100%;max-width:320px;border:0;height:80px;outline:0" 
  frameborder="0"
  scrolling="no"
/>
```

[<img src="/public/strava-example.png" alt="strava widget example" width="320" />](https://astro-widgets.netlify.app/strava/)

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

### [Literal.club](https://literal.club)

A widget to show the latest book marked "currently reading".
Style inspired by [@aepicos](https://github.com/aepicos)'s [work](https://codepen.io/aepicos/pen/dERYKm)


```
<iframe 
  src="{YOUR_NETLIFY_DOMAIN}/literal" 
  style="width:100%;max-width:480px;border:0;height:{CHECK_THE_TABLE_BELOW};outline:0" 
  frameborder="0"
  scrolling="no"
/>
```

[<img src="/public/literal-example.png" alt="literal.club widget example" width="480" />](https://astro-widgets.netlify.app/literal/)

#### Configuration

| Environment Variable         | Default               | Description |
| ---------------------------- | --------------------- | ----------- |
| `LITERALCLUB_EMAIL`          | _(mandatory)_         | [As per the literal.club API instruction](https://literal.club/pages/api) |
| `LITERALCLUB_PWD`            | _(mandatory)_         |  |
| `PUBLIC_LITERALCLUB_BGCOLOR` | `#e8e3d5`             | Any color in any css digestible format, the font color will change according to contrast needs |
| `PUBLIC_LITERALCLUB_SIZE`    | `small`               | Options available `small`, `medium`, `large`. Each changes the height of the iframe (respectively: 128px, 164px and 200px) |

