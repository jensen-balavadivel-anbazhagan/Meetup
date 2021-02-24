import {createLocalVue, shallowMount} from '@vue/test-utils';
import NewReview from '@/views/NewReview.vue';
import VueConfirmDialog from "vue-confirm-dialog";

describe('NewReview.vue', () => {
  let wrapper;
  const localVue = createLocalVue();
  localVue.use(VueConfirmDialog);
  //before each test case load the wrapper with all the test data
  beforeEach(() => {
      const getEvent = jest.spyOn(NewReview.methods, 'getEvent').mockReturnValue(Promise.resolve());
     
      let revList = {
          "id": 1,
          "eventId": 1,
          "user": "Test User",
          "rating": 3,
          "review": "Great Event"
        };
       wrapper = shallowMount(NewReview, {
          global: {
              mocks: {
                  $route: {
                      params: { id:1 },
                      push: jest.fn()
                  },
                  $store: {
                      state: {
                            reviewService: {
                              ratingForEvent:  3 ,
                              reviewList : revList
                            },
                              userService: {
                              user : {"id":1,"name":"Bala","emailId":"bala@gmail.com","events":[2,3]}
                            }
                      }
                  },
              }
          },
          data() {
            return {
              star: "",
              reviewInput: "",
              newRatings: null,
              showError: false,
              maxLimit: 5,
            };
          },
          beforeMount() {
              getEvent
          },
          computed: {
            rating() {
              return 3;
          }
          },
          localVue,
      })

  });
  it('showError is set true when the maximum character limit for review is exceeded', async () => {
    const checkLimit = jest.spyOn(NewReview.methods, 'checkLimit').mockReturnValue((Promise.resolve()));
    const review = wrapper.find('#review');
    review.setValue("TestLength");
    expect(checkLimit).toHaveBeenCalled;
    expect(wrapper.vm.$data.showError).toBe(true);
    
  })
    it('calls saveReview when save review button is clicked', async () => {
      const saveReview = jest.spyOn(NewReview.methods, 'saveReview').mockReturnValue(Promise.resolve());
      await wrapper.find('.saveReviewBtn').trigger('click');
      expect(saveReview).toHaveBeenCalled;
      
    })

}) 