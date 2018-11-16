const Whitelist = artifacts.require('Whitelist');
const shouldFail = require('./helpers/shouldFail');

contract('Whitelist', function ([_, owner, bob, ...otherAccounts]) {
  beforeEach(async function () {
    this.whitelist = await Whitelist.new({ from: owner });
  });

  describe('whitelist', function () {
    it('should succesfully whitelist an address', async function () {
      (await this.whitelist.isWhitelisted(bob)).should.be.equal(false);
      await this.whitelist.setWhitelisted(bob, true, { from: owner });
      (await this.whitelist.isWhitelisted(bob)).should.be.equal(true);
    });

    it('should succesfully remove an address from whitelist', async function () {
      await this.whitelist.setWhitelisted(bob, true, { from: owner });
      await this.whitelist.setWhitelisted(bob, false, { from: owner });
      (await this.whitelist.isWhitelisted(bob)).should.be.equal(false);
    });

    it('should fail when a third party tries to set a whitelisted address', async function () {
      await shouldFail.reverting(this.whitelist.setWhitelisted(bob, true, { from: bob }));
    });

    it('should succesfully batch whitelist', async function () {
      await this.whitelist.batchWhitelist(otherAccounts, { from: owner });
      (await this.whitelist.isWhitelisted(otherAccounts[0])).should.be.equal(true);
      (await this.whitelist.isWhitelisted(otherAccounts[4])).should.be.equal(true);
      (await this.whitelist.isWhitelisted(otherAccounts[6])).should.be.equal(true);
    });

    it('should fail when a third party tries to batch whitelist', async function () {
      await shouldFail.reverting(this.whitelist.batchWhitelist(otherAccounts, { from: bob }));
    });

    it('should succefully batch whitelist 50 addresses', async function () {
      const array = [];
      for(let i = 0; i < 49; i++)
      {
        array.push(otherAccounts[0]);
      }
      array.push(bob);
      await this.whitelist.batchWhitelist(array, { from: owner });
      (await this.whitelist.isWhitelisted(bob)).should.be.equal(true);
    });
  });
});
