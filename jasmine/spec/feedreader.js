// feedreader.js for Jasmine tests
/* All tests have been put in the $() function,
* since some of these tests may require DOM elements.
* We want to ensure they don't run until the DOM is ready.
*/

$(function() {
  // Test suite for RSS feeds definitions checking the allFeeds variable

  describe('RSS Feeds', function() {
     /* Test to make sure that the to make sure that the
      * allFeeds variable has been defined and that it is not
      * empty.
      */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Tests that all feeds have a URL
    it('URL is not empty', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /* Test loops through feeds, ensures there is a name
    * and it is not empty
    */
    it('name is defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

// The Menu test suite
  describe('The Menu', function() {

    // Test that ensures the menu element is hidden by default.
    let body = document.body;
    let menuIcon = document.querySelector('.menu-icon-link');

    it('is hidden by default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    // Tests for menu visible/hidden changes when icon clicked
    it('changes visibility when clicked', function() {
      // Two tests: first click does menu open, second click hides
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      menuIcon.click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });


  // Test suite for Initial Entries
  describe('Initial Entries', function() {

    // loadFeed function creates at least one element in .feeds
    // Asynchronous test
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    it('should have at least one entry', function(done) {
      let entries = $('.feed .entry');
      expect(entries.length).toBeGreaterThan(0);
      done();
    });
  });

  // New test suite for New Feed Selection
  describe('New Feed Selection', function() {

     // Content changes on new load feeds
     // Asynchronous test
    let firstLoadFeed,
      secondLoadFeed;

    beforeEach(function(done) {
      loadFeed(0, function() {
        firstLoadFeed = document.querySelector('.feed').innerHTML;

        loadFeed(1, function() {
          secondLoadFeed = document.querySelector('.feed').innerHTML;
          done();
        });
      });
    });

    it('should have a new feed', function() {
      expect(firstLoadFeed).not.toBe(secondLoadFeed);
    });
  });

}());
