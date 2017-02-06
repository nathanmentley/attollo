import http from 'http';
import https from 'https';
import redirectHttps from 'redirect-https';
import greenlockExpress from 'greenlock-express';
import leChallengeFs from 'le-challenge-fs';
import leStoreCertbot from 'le-store-certbot';

import ConfigUtils from './ConfigUtils';
import LogUtils from './LogUtils';

export default class WebUtils {
    static EnableCors(app) {
        app.all('*', (req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });
    }

    static StartWebApp(app, httpPort, httpsPort) {
        var lex = greenlockExpress.create(
            {
                server: ConfigUtils.Config.LetsEncryptServer,
                challenges: {
                    'http-01': leChallengeFs.create({
                        webrootPath: '/home/web/keys/letsencrypt/srv/www/:hostname/.well-known/acme-challenge'
                    })
                },
                store: leStoreCertbot.create({
                    configDir: '/home/web/keys/letsencrypt/etc',          // or /etc/letsencrypt or wherever
                    privkeyPath: ':configDir/live/:hostname/privkey.pem',          //
                    fullchainPath: ':configDir/live/:hostname/fullchain.pem',      // Note: both that :configDir and :hostname
                    certPath: ':configDir/live/:hostname/cert.pem',                //       will be templated as expected by
                    chainPath: ':configDir/live/:hostname/chain.pem',              //       node-letsencrypt

                    workDir: '/home/web/keys/letsencrypt/var/lib',
                    logsDir: '/home/web/keys/letsencrypt/var/log',

                    webrootPath: '/home/web/keys/letsencrypt/srv/www/:hostname/.well-known/acme-challenge',

                    debug: false
                }),
                approveDomains: approveDomains
            }
        );

        // handles acme-challenge and redirects to https
        http.createServer(lex.middleware(redirectHttps())).listen(httpPort, () => {
            LogUtils.Info("Listening for ACME http-01 challenges.");
        });
        // handles your app
        return https.createServer(lex.httpsOptions, lex.middleware(app)).listen(httpsPort, () => {
            LogUtils.Info("Listening for ACME tls-sni-01 challenges and serve app.");
        });
    }
}