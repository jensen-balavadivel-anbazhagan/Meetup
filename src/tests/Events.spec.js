import {shallowMount} from '@vue/test-utils';
import Events from '@/views/Events.vue';

describe('Events.vue', () => {
    it('calls filter when input is changed', () => {
        const filter = jest.spyOn(Events.methods, 'filter');
        const  allEvents = [
            {
              "id": 1,
              "Title": "Gothenburg Toastmasters - English-speaking club",
              "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to àdvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
              "When": "Mar 8 2022",
              "Time": "6:30 PM - 8:30 PM",
              "Location": "Online",
              "reviews": [],
              "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
            },
            {
              "id": 2,
              "Title": "The themes from 'Thinking, Fast and Slow' ",
              "Description": "In his mega bestseller, Thinking, Fast and Slow, Daniel Kahneman, world-famous psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. The impact of overconfidence on corporate strategies, the difficulties of predicting what will make us happy in the future, the profound effect of cognitive biases on everything from playing the stock market to planning our next vacation―each of these can be understood only by knowing how the two systems shape our judgments and decisions.",
              "When": "Feb 8 2022",
              "Time": "6:30 PM - 8:30 PM",
              "Location": "Online",
              "reviews": [
                1
              ],
              "Img": "https://tcagley.files.wordpress.com/2019/04/img_1054.jpg?w=204"
            }
        ];

        const wrapper = shallowMount(Events, {
            propsData: {
                events: allEvents
            }
        });
        const searchBox = wrapper.find('#search');
        searchBox.setValue('Fast');
        searchBox.trigger('input');
        expect(filter).toHaveBeenCalled;
        expect(wrapper.vm.$data.filteredList.length).toBe(1);
    })

}) 