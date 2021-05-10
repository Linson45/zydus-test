import Async from './storage/Async';

class Adapter {
  static async get(key) {
    return Async.get(key);
  }

  static async set(key, value) {
    await Async.set(key, value);
  }

  static remove(key) {
    Async.remove(key).then(() => {
      console.log('Async item removed.');
    }).catch((error) => {
      console.log(`Promise is rejected with error: ${error}`);
    });
  }

  static async setUser(user) {
    try {
      await Adapter.set('user', user);
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }

  static async getUser() {
    try {
      const data = await Adapter.get('user');
      return data;
    } catch (e) {
      return null;
    }
  }

  static async logout() {
    this.remove('user');
  }

  static async isBiologics() {
    const user = await Adapter.getUser();
    const { company_code, sbu_code } = user;
    const biologics = [
      { company_code: '1000', sbu_code: '06' },
      { company_code: '1000', sbu_code: '09' },
      { company_code: '1000', sbu_code: '12' },
      { company_code: '1000', sbu_code: '14' },
      { company_code: '1000', sbu_code: '15' },
      { company_code: '1000', sbu_code: '17' },
      { company_code: 'FR', sbu_code: '61' },
      { company_code: 'FR', sbu_code: '62' },
      { company_code: 'FR', sbu_code: '64' },
      { company_code: '1000', sbu_code: '91' },
      { company_code: '1000', sbu_code: 'BA' },
      { company_code: '1000', sbu_code: 'BB' },
      { company_code: '1000', sbu_code: 'BC' },
      { company_code: '1000', sbu_code: 'BD' },
      { company_code: '1000', sbu_code: 'BI' },
      { company_code: '1000', sbu_code: 'BO' },
    ];
    let found = false;
    biologics.forEach((item) => {
      if (item.company_code === company_code && item.sbu_code === sbu_code) {
        found = true;
      }
    });
    return found;
  }

  static async getAuthHeader() {
    const user = await Adapter.getUser();
    if (user) {
      const { login_token } = user;
      if (login_token) {
        return {
          Authorization: `Bearer ${login_token}`,
        };
      }
    }
    return null;
  }
}

export default Adapter;
