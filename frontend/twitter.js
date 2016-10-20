const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');
const InfiniteTweet = require('./infinite_tweets.js');

$(() => {
  const $buttons = $(".follow-toggle");
  $buttons.each(function(){
    new FollowToggle($(this));
  });
  const $searchFields = $('.users-search');
  $searchFields.each(function(){
    new UsersSearch($(this));
  });
  new TweetCompose($(".tweet-compose"));
  new InfiniteTweet($(".infinite-tweets"));
});
