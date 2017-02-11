import http from 'http';
import https from 'https';
import redirectHttps from 'redirect-https';
import greenlockExpress from 'greenlock-express';
import leChallengeFs from 'le-challenge-fs';
import leStoreCertbot from 'le-store-certbot';
import pem from 'pem';

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
        if(ConfigUtils.Config.Environment == "Local") {
            var server = app;

            // handles acme-challenge and redirects to https
            http.createServer(redirectHttps({port: ConfigUtils.Config.ExternalSecurePortNumber})).listen(httpPort, () => {
                LogUtils.Info("redirecting traffic to https");
            });

            pem.createCertificate({days:1, selfSigned:true}, (err, keys) => {
                server = https.createServer({key: keys.serviceKey, cert: keys.certificate}, app).listen(httpsPort);
            });

            return server;
        } else {
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
                    approveDomains: (opts, certs, cb) => {
                        try {
                            // This is where you check your database and associated
                            // email addresses with domains and agreements and such

                            // The domains being approved for the first time are listed in opts.domains
                            // Certs being renewed are listed in certs.altnames
                            if (certs) {
                                opts.domains = certs.altnames;
                            }
                            else {
                                opts.email = 'nathanmentley@gmail.com';
                                opts.agreeTos = true;
                            }

                            // NOTE: you can also change other options such as `challengeType` and `challenge`
                            // opts.challengeType = 'http-01';
                            // opts.challenge = require('le-challenge-fs').create({});

                            cb(null, {options: opts, certs: certs});
                        } catch (e) {
                            LogUtils.Error(JSON.stringify(e));
                        }
                    }
                }
            );

            // handles acme-challenge and redirects to https
            http.createServer(lex.middleware(redirectHttps({port: ConfigUtils.Config.ExternalSecurePortNumber}))).listen(httpPort, () => {
                LogUtils.Info("Listening for ACME http-01 challenges.");
            });

            // handles your app
            return https.createServer(lex.httpsOptions, lex.middleware(app)).listen(httpsPort, () => {
                LogUtils.Info("Listening for ACME tls-sni-01 challenges and serve app.");
            });
        }
    }
}