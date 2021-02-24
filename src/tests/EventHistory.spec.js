import {shallowMount} from '@vue/test-utils';
import EventHistory from './../components/EventHistory.vue';

describe('EventHistory.vue', () => {
    it('calls filter when input is changed', () => {
      const review = jest.spyOn(EventHistory.methods, 'review').mockReturnValue(Promise.resolve());
      const wrapper = shallowMount(EventHistory, {
        propsData: {
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
      });
      wrapper.find('.reviewBtn').trigger('click');
      expect(review).toHaveBeenCalled;
    })

}) 