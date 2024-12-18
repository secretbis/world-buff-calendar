import aws from 'aws-sdk';

import util from 'util';
const debug = util.debuglog('rcc');

aws.config.setPromisesDependency(Promise);
aws.config.update({ region: 'us-west-1' });

export default class AWS {
  s3 = null;

  constructor() {
    this.s3 = new aws.S3();
  }

  storeCalendar(realm, iCal) {
    console.info(`Saving calendar for realm ${realm.name}`);
    debug(iCal.toString());

    const cleanRealm = realm.name.toLowerCase().replace(/\s+/g, '-');

    return this.s3
      .upload({
        Bucket: 'world-buff-calendar',
        Key: `world-buff-${cleanRealm}.ics`,
        Body: iCal.toString(),
        ACL: 'public-read',
      })
      .promise()
      .then((resp) => {
        console.info(`Successfully saved calendar for realm: ${realm.name}`);
        debug(resp);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
