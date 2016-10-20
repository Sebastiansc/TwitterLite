class TweetCompose {
  constructor($el) {
    this.form = $el;
    this.input = $el.find('textarea');
    this.form.on("submit", this.submit.bind(this));
    this.input.on("input", this.countChars.bind(this) );
    $('.add-mention-user').click(this.addMentionedUser.bind(this));
    $('.mentions').on("click", ".remove-mentioned-user", this.removeMentionedUser.bind(this));
  }

  submit(e){
    e.preventDefault();
    let tweet = this.form.serializeJSON();
    this.form.find(":input").prop('disabled', true);
    let that = this;

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: tweet,
      dataType: 'json',
      success(response){
        that.handleSuccess(response);
      }
    });
  }

  handleSuccess(response){
    this.clearInput();
    this.form.find(":input").prop('disabled', false);
    $('#feed').trigger("insert-tweet", response);
  }

  clearInput(){
    this.form.find("textarea").val("");
    $('.mentions').empty();
  }

  countChars(){
    let $counter = $('.chars-left');
    $counter.text(140 - this.input.val().length);
  }

  addMentionedUser(){
    let $script = this.form.find("script");
    $('.mentions').append($script.html());
  }

  removeMentionedUser(e){
    let $a = $(e.currentTarget);
    $a.parent().remove();
  }
}

module.exports = TweetCompose;
