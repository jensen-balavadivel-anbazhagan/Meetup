import {shallowMount} from '@vue/test-utils';
import Profile from '@/views/Profile.vue';
import Login from "./../components/Login";
import EventHistory from './../components/EventHistory.vue';

describe('Profile.vue', () => {
    it('Login page should be displayed when the user is not available', () => {
        const wrapper = shallowMount(Profile, {
          computed: {
          user() {
            return {};
          },
          eventHistory() {
            return {};
          }
        },
        components: {
          Login
        },
        });
        const login = wrapper.findComponent(Login);
        const portrait = wrapper.find('.portrait');
        expect(login.exists()).toBe(true);
        expect(portrait.exists()).toBe(false);
    })

it('Event History should be displayed when the user is available', () => {
  const  userData = {"id":1,"name":"Bala","emailId":"bala@gmail.com","events":[2,3]};
  const  eventData = [
    {"event":
    {"id":2,
    "Title":"The themes from 'Thinking, Fast and Slow' ",
    "Description":"In his mega bestseller, Thinking, Fast and Slow, Daniel Kahneman, world-famous psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. The impact of overconfidence on corporate strategies, the difficulties of predicting what will make us happy in the future, the profound effect of cognitive biases on everything from playing the stock market to planning our next vacation―each of these can be understood only by knowing how the two systems shape our judgments and decisions.",
    "When":"Feb 8 2021, 6:30 PM - 8:30 PM",
    "Location":"Online",
    "reviews":[1],
    "Img":"https://tcagley.files.wordpress.com/2019/04/img_1054.jpg?w=204"
  }
  },
  {"event":
  {"id":3,
  "Title":"Jönköping Toastmasters Meeting",
  "Description":"We provide a supportive and positive learning experience in which members are empowered to develop communication and leadership skills, resulting in greater self-confidence and personal growth.",
  "When":"Apr 8 2021, 8:30 AM - 12:30 PM",
  "Location":"Online",
  "reviews":[2],
  "Img":"https://secure.meetupstatic.com/photos/event/7/8/f/9/600_492210969.jpeg"
}
}
];
  const wrapper = shallowMount(Profile, {
    computed: {
    user() {
      return userData;
    },
    eventHistory() {
      return eventData;
    }
  },
  components: {
    Login,
    EventHistory
  },
  });
  const login = wrapper.findComponent(Login);
  const eventHistory = wrapper.findComponent(EventHistory);
  expect(login.exists()).toBe(false);
  expect(eventHistory.exists()).toBe(true);
})

}) 
