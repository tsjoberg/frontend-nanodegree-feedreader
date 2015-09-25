/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds instanceof Array).toBeTruthy();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('each feed has non-empty URL', function() {
            allFeeds.forEach(function(feed) {
                //Check url is defined and not null
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
                expect(feed.url.length).toBeGreaterThan(0);
                expect(feed.url).toMatch(/^http(s?)\:\/\//);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('each feed has non-empty name', function() {
            allFeeds.forEach(function(feed) {
                //Check name is defined and not null
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
                expect(typeof feed.name).toBe('string');
                expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

        it('menu is hidden by default', function() {
            //Test if body element has the 'menu-hidden' class which hides the menu
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('menu should toggle on click', function() {
            //Use jQuery to perform click action
            $('.menu-icon-link').click();
            //After initial click - menu should be displayed via removal of 'menu-hidden' class
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //Use jQuery to perform click action
            $('.menu-icon-link').click();
            //After second click - menu should be hidden via addition of 'menu-hidden' class
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('at least one entry element after loadFeed', function(done) {
            //Use jQuery to get the array/length of entry-link elements
            expect($('.entry-link').length).toBeGreaterThan(0);
            done();
        });

    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    
    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        var contentBefore, contentAfter;

        beforeEach(function(done) {
            loadFeed(0, function() {
                contentBefore = $('.feed').html();
                loadFeed(1, function() {
                    contentAfter = $('.feed').html();
                    done();
                });
            });
        });

        it('contents change after feed change', function(done) {
            //Use jQuery to get the array/length of entry-link elements
            expect(contentBefore).not.toBe(contentAfter);
            done();
        });
        
    });
   
}());
