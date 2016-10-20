class InfiniteTweet{
  constructor($el){
    this.el = $el;
    this.maxCreatedAt = null;
    $('.add-more').click(this.fetchTweets.bind(this));
    $('#feed').on("insert-tweet", this.insertTweet.bind(this));
  }

  fetchTweets(e){
    let time = {};
    if (this.maxCreatedAt != null){
      time.max_created_at = this.maxCreatedAt;
    }
    let that = this;
    $.ajax({
      url: "/feed",
      dataType: 'json',
      data: time,
      success(response){
        that.insertTweet("fakl;gvjnaer", response);
      }
    });
  }

  insertTweet(garbage, response){
    if (!Array.isArray(response)){
      let $li = $(`<li>${response.content} -- ${response.created_at}</li>`);
      $('#feed').prepend($li);
    } else {
      response.forEach(function(el){
        let $li = $(`<li>${el.content} -- ${el.created_at}</li>`);
        $('#feed').append($li);
      });
    }

    this.maxCreatedAt = response[response.length - 1].created_at;
    if (response.length < 20){
      this.noMoreTweets();
    }
  }

  noMoreTweets(){
    $('.add-more').text("No More Tweets");
    $('.add-more').unbind('click');
  }
}

module.exports = InfiniteTweet;
