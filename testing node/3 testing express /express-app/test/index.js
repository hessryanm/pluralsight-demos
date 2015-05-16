'use strict';

var request = require("request-promise")
  , chai = require("chai")
  , expectedResults = require("./expected")
  ;

require("../server");
chai.should();

describe("testing routes", function () {
  
  it("gets the HTML for index", function () {
    return request("http://localhost:3003").then(function (response) {
      response.should.equal(expectedResults.index_html);
    });
  });
  
  it("gets courses", function () {
    return request("http://localhost:3003/api/courses").then(function (response) {
      response = JSON.parse(response);
      response.should.deep.equal(expectedResults.courses_json);
    });
  });
});

/*

At this point, I have a couple tests.  That's good, but these are more integration tests than unit tests.  They are testing ALL of our code / the entire route, all at once.

Also, what happens when the info changes?  Say we change what our home page looks like?
Or, even worse, what happens when we add another course?  Because we're testing the entire thing, we can't mock out the response on the GET courses or anything like that.  If we add another course, the JSON response from that GET won't be the same anymore, and our test will fail, even though everything works the same.

Instead, we need to architect our app better.  If we architect our app in a different way, we can much more easily test the individual pieces, like that the right route functions are being called for the right endpoints, or mocking out the response.

*/