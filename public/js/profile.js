document.addEventListener("DOMContentLoaded", function(evt) {
   let username = formatName(getQuery()["user_profile"]);
   document.title = `TeamBod | ${username}`;
});