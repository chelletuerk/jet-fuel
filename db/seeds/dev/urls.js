exports.seed = function(knex, Promise) {
  return knex('urls').del()
  .then(() => {
    return Promise.all([
      knex('urls').insert({
        id: "HkrRLh2Ge",
        folderId: 1,
        shortenedUrl: "amazon1",
        url: 'http://www.amazon.com',
        created_at: new Date,
        numOfClicks: 1,
      }),
      knex('urls').insert({
        id: "asdfjkl",
        folderId: 2,
        shortenedUrl: "twitter2",
        url: 'http://www.twitter.com',
        created_at: new Date,
        numOfClicks: 2,
      }),
      knex('urls').insert({
        id: "qWeRtY",
        folderId: 1,
        shortenedUrl: "facebook3",
        url: 'http://www.facebook.com',
        created_at: new Date,
        numOfClicks: 3,
      })
    ]);
  });
};
