const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log(refreshToken)
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://localhost:3000',
        clientId: 'ef28fb40d76e47b59f846d26a12d83eb',
        clientSecret: 'e2a1598c1c6c486f8413178410331156',
        refreshToken,
    })

    spotifyApi.refreshAccessToken()
    .then((data) => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    }).catch(err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code;
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://localhost:3000',
        clientId: 'ef28fb40d76e47b59f846d26a12d83eb',
        clientSecret: 'e2a1598c1c6c486f8413178410331156'
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.listen(3001)