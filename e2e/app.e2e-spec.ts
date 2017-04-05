import { Ng2YdtPartnerSystemPage } from './app.po';

describe('ng2-ydt-partner-system App', function() {
  let page: Ng2YdtPartnerSystemPage;

  beforeEach(() => {
    page = new Ng2YdtPartnerSystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
