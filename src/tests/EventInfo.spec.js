import {shallowMount} from '@vue/test-utils';
import EventInfo from '@/views/EventInfo.vue';
import ReviewItem from "./../components/ReviewItem.vue";

describe('EventInfo.vue', () => {

    let wrapper;
    //before each test case load the wrapper with all the test data
    beforeEach(() => {
        const getEvent = jest.spyOn(EventInfo.methods, 'getEvent').mockReturnValue(Promise.resolve());
        let revList = {
            "id": 1,
            "eventId": 1,
            "user": "Test User",
            "rating": 3,
            "review": "Great Event"
          };
         wrapper = shallowMount(EventInfo, {
            global: {
                mocks: {
                    $route: {
                        params: { id:1 }
                    },
                    $store: {
                        state: {
                            reviewService: {
                                ratingForEvent:  3 ,
                                reviewList : revList
                            }
                        }
                    }
                }
            },
            beforeMount() {
                getEvent
            },
            computed: {
                user() {
                  return  {"id":1,"name":"Bala","emailId":"bala@gmail.com","events":[2,3]};
                },
                reviewList() {
                    return  revList;
                  },
                  infoChosen() {
                      return {
                          "id": 1,
                          "Title": "Gothenburg Toastmasters - English-speaking club",
                          "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to �dvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
                          "When": "Mar 8, 2022 6:30 PM - 8:30 PM",
                          "Location": "Online",
                          "reviews" : [1],
                          "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
                      };
                  },
                  rating() {
                      return 3;
                  }
              },
            components: {
                ReviewItem,
              },
            propsData: {
                events : [{
                    Title: "Gothenburg Toastmasters - English-speaking club"
                }],
                event: {
                    "id": 1,
                    "Title": "Gothenburg Toastmasters - English-speaking club",
                    "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to ?dvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
                    "When": "Mar 8, 2022 6:30 PM - 8:30 PM",
                    "Location": "Online",
                    "reviews" : "",
                    "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
                }
            }
        })

    });
    
    it('Should show Title of chosen event', async () =>  {
       
        const information = await wrapper.find('h2').text();
        const expected = 'Gothenburg Toastmasters - English-speaking club'
        expect(information).toMatch(expected);
    }) 
    it('Should display the image of chosen event', () => {
        const image = wrapper.findAll('img');
        const expectedImages = 1;
        const actualImages = image.length;
        expect(actualImages).toBe(expectedImages);
    }) 
    it('Should have sign up btn', () => {
        const actual = wrapper.findAll('.addBtn')
        expect(actual).toBeTruthy();
    })

    it('Should call addToProfile method when Sign up button is clicked', async () => {
        const addToProfile = jest.spyOn(EventInfo.methods, 'addToProfile').mockReturnValue(Promise.resolve());

        await wrapper.find('.disabledButton').trigger('click');
        expect(addToProfile).toHaveBeenCalled;
    })

    it('Should display the reviews list for the past event', async () => {
        const reviewItem = wrapper.findComponent(ReviewItem);
        expect(reviewItem.exists()).toBe(false);
    })

}) 
