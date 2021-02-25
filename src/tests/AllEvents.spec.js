import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router'
import AllEvents from '@/components/AllEvents.vue'

describe('AllEvents.vue', () => {

    it('should display title on all events when mounted', () => {
        const wrapper = shallowMount(AllEvents, {
            propsData: {
                event: {
                    "id": 1,
                    "Title": "Gothenburg Toastmasters - English-speaking club",
                    "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to �dvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
                    "When": "Mar 8, 2021 6:30 PM - 8:30 PM",
                    "Location": "Online",
                    "reviews" : "",
                    "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
                }
            }
        });
        const eventNameExist = wrapper.findAll('h3').exists();

        const expectedTitle = 'Gothenburg Toastmasters - English-speaking club';
        const actualTitle = wrapper.find('h3').text();

        expect(eventNameExist).toBeTruthy();
        expect(actualTitle).toBe(expectedTitle);
    })



    it('every event card should have sign up btn', () => {
        const wrapper = shallowMount(AllEvents, {
            propsData: {
                event: {
                    "id": 1,
                    "Title": "Gothenburg Toastmasters - English-speaking club",
                    "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to �dvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
                    "When": "Mar 8, 2021 6:30 PM - 8:30 PM",
                    "Location": "Online",
                    "reviews" : "",
                    "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
                }
            }
        })

        const actual = wrapper.findAll('.addBtn')
        expect(actual).toBeTruthy();
    })


    it('should go to individual event when event is clicked', async () => {
        const localVue = createLocalVue()
        localVue.use(VueRouter)
        const router = new VueRouter()
        const wrapper = shallowMount(AllEvents, {

            propsData: {
                event: {
                    "id": 1,
                    "Title": "Gothenburg Toastmasters - English-speaking club",
                    "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to �dvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
                    "When": "Mar 8, 2021 6:30 PM - 8:30 PM",
                    "Location": "Online",
                    "reviews" : "",
                    "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
                }
            },
            localVue,
            router
        })

        await wrapper.find('.aboutEvent').trigger('click')
        expect(wrapper.vm.$route.path).toBe('/eventInfo/1')
    })
    
    it('Should call addToProfile method when Sign up button is clicked', async () => {
        const addToProfile = jest.spyOn(AllEvents.methods, 'addToProfile').mockReturnValue(Promise.resolve());;
        const wrapper = shallowMount(AllEvents, {
            
            computed: {
                user() {
                  return  {"id":1,"name":"Bala","emailId":"bala@gmail.com","events":[2,3]};
                }
              },
            propsData: {
                event: {
                    "id": 1,
                    "Title": "Gothenburg Toastmasters - English-speaking club",
                    "Description": "Struggling with public-speaking anxiety? Looking to develop leadership skills? Want to �dvance your career?Then why not visit Gothenburg Toastmasters?We would love to see you at our next meeting.",
                    "When": "Mar 8, 2021 6:30 PM - 8:30 PM",
                    "Location": "Online",
                    "reviews" : "",
                    "Img": "https://secure.meetupstatic.com/photos/event/b/5/c/e/highres_488206542.jpeg"
                }
            },
        })

        await wrapper.find('.disabledButton').trigger('click')
        expect(addToProfile).toHaveBeenCalled;
    })
})