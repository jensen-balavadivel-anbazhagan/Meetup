import axios from "axios";
import router from '../router';

const config = require('../assets/config.json');
export default {
  state: {
    ratingForEvent: "",
    reviewList: [],
  },
  mutations: {
    setRatingForEvent(state, ratingsList) {
      state.ratingForEvent = 0 
      let sum = 0;
      ratingsList.forEach( rating => {
        sum += rating.rating;
      });
      state.ratingForEvent = sum/ratingsList.length;
    },

    addReviewList(state, data) {
      state.reviewList = [];
      data.forEach(review => {
        state.reviewList.push({
          review
        })
      });
    }
    
  },
  actions: {
    async getReviewForEvent(ctx, eventId) {

      return axios.get(config.dbURl, {

        headers: {
          "secret-key": config.token,
        },
      }).then(
        response => {
          let reviews = response.data.reviews;
          let ratingsList = reviews.filter( review => {
            return review.eventId == eventId;
          });
          ctx.commit('setRatingForEvent', ratingsList);
          let newReviewList = [];
         
          ratingsList.forEach(review => {
            let user = response.data.users.filter(userData => {
              return userData.id == review.userId
            });
            let newReview = {
              id: review.id,
              eventId: review.eventId,
              user: user[0].name,
              rating: review.rating,
              review: review.review,
            }
            newReviewList.push(newReview);
           
          }) ;
          ctx.commit('addReviewList', newReviewList);

        }).catch(e => {
          console.log(e);
        });
    },
    async addReview(ctx, review) {

      return axios.get(config.dbURl, {

        headers: {
          "secret-key": config.token,
        },
      }).then(
        response => {
          let resData = response.data;
          let newReview = {
            id: response.data.reviews.length+1,
            eventId: review.eventId,
            userId: review.userId,
            rating: review.rating,
            review: review.review
          };
          resData.reviews.push(newReview);
          return axios.put(config.dbURl, resData, {

            headers: {
              "secret-key": config.token,
              "versioning": false
            },
          }).then(
            res => {
              if (res.data.success == true) {
                router.push(`/eventInfo/${review.eventId}`);
              }

            }).catch(e => {
              console.log(e);
            });

        }).catch(e => {
          console.log(e);
        });
    },
  }
}