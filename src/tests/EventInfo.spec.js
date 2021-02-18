import {shallowMount} from '@vue/test-utils';
import EventInfo from '@/views/EventInfo.vue';

describe('EventInfo.vue', () => {
    it('Should show name of chosen event', async () =>  {
        const wrapper = shallowMount(EventInfo, {
            global: {
                mocks: {
                    $route: {
                        params: { id:1 }
                    }
                }
            },
            propsData: {
                events : [{
                    Title: "Gothenburg Toastmasters - English-speaking club"
                }],
            }
        })
        const information = await wrapper.find('h2').text();
        const expected = 'Error'
        expect(information).toMatch(expected);
    }) 
    it('Should display the image of chosen event', () => {
        const wrapper = shallowMount(EventInfo);
        const image = wrapper.findAll('img');
        const expectedImages = 1;
        const actualImages = image.length;
        expect(actualImages).toBe(expectedImages);
    }) 
    it('Should have sign up btn', () => {
        const wrapper = shallowMount(EventInfo)

        const actual = wrapper.findAll('.addBtn')
        expect(actual).toBeTruthy();
    })

    it('Should call addToProfile method when Sign up button is clicked', async () => {
        const addToProfile = jest.spyOn(EventInfo.methods, 'addToProfile').mockReturnValue(Promise.resolve());;
        const wrapper = shallowMount(EventInfo, {
            
            computed: {
                user() {
                  return  {"id":1,"name":"Bala","emailId":"bala@gmail.com","events":[2,3]};
                }
              },
            propsData: {
                event: {
                    "id": 1,
                    "Title": "Gothenburg Toastmasters - English-speaking club",
                    "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to ?dvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
                    "When": "Mar 8, 2021 6:30 PM - 8:30 PM",
                    "Location": "Online",
                    "reviews" : "",
                    "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
                }
            },
        })

        await wrapper.find('.addBtn').trigger('click')
        expect(addToProfile).toHaveBeenCalled;
    })

}) 