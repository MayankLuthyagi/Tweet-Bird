<template>
  <q-page class ="relative-position">
    <q-scroll-area class="absolute fullscreen">
      <div class = "q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
          <q-input
            bottom-slots
            v-model="newTweet"
            class = "new-Tweet"
            placeholder="What's happening"
            counter
            maxlength="280"
            autogrow
            >
            <template v-slot:before>
              <q-avatar size="xl">
                <img src="src/assets/Photo.jpg">
              </q-avatar>
            </template>
          </q-input>
        </div>
        <div class="col col-shrink">
          <q-btn
            @click="addNewTweet"
            :disable = "!newTweet"
            class = "q-mb-lg"
            unelevated
            rounded
            color ="primary"
            label ="Tweet"
            no-caps
            />
        </div>
      </div>
      <q-separator class = "divider" size = "10px" color="grey-2" />
      <q-list separator >
        <transition-group
        appear
        enter-active-class="animated fadeIn slow"
        leave-active-class="animated fadeOut slow"
        >
          <q-item
          v-for="tweet in Tweet"
          :key="tweet.date"
          class="tweet q-py-md"
          >
            <q-item-section avatar>
              <q-avatar size="xl">
                  <img src="src/assets/Photo.jpg">
                </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label  class="text-subtitle1">
                <strong>Mayank</strong>
                <span class="text-grey-7">
                  @mayank_luthyagi
                  <br class ="lt-md" > &bull; {{ formatRelativeDate(tweet.date) }}
                </span>
              </q-item-label>
              <q-item-label class="tweet-content text-body1">
                {{ tweet.content }}
              </q-item-label>
              <div class="tweet-icon row justify-between q-mt-sm">
                <q-btn flat round color="grey" icon="far fa-comment" size="sm"/>
                <q-btn flat round color="grey" icon="fas fa-retweet" size="sm"/>
                <q-btn flat round color="grey" icon="far fa-heart" size="sm"/>
                <q-btn @click = "deleteTweet(tweet)" flat round color="grey" icon="far fa-trash" size="sm"/>
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
  </q-scroll-area>
  </q-page>
</template>g

<script>
import { formatDistance } from 'date-fns'
export default {
  name: 'PageHome',
  data () {
    return {
      newTweet: '',
      Tweet: [
        {
          content: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur nisi ullam consequuntur et quo eius sit veritatis optio odio eos dignissimos similique sapiente, natus saepe quas dolores illum. Similique, beatae.',
          date: 1720661119159
        },
        {
          content: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur nisi ullam consequuntur et quo eius sit veritatis optio odio eos dignissimos similique sapiente, natus saepe quas dolores illum. Similique, beatae.',
          date: 1720661133275
        }
      ]
    }
  },
  methods: {
    formatRelativeDate (value) {
      return formatDistance(new Date(value), new Date())
    },
    addNewTweet () {
      const addTweet = {
        content: this.newTweet,
        date: Date.now()
      }
      this.Tweet.unshift(addTweet)
      this.newTweet = ''
    },
    deleteTweet (tweet) {
      const dateToDelete = tweet.date
      const index = this.Tweet.findIndex(tweet => tweet.date === dateToDelete)
      console.log('index:', index)
      this.Tweet.splice(index, 1)
    }
  }
}
</script>
<style lang="sass">
.new-Tweet
  textarea
    font-size: 19px
    line-height: 1.4 !important
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.tweet-content
  white-space: pre-line
.tweet-icon
  margin-left: -5px
.tweet:not(:first-child)
  border-top: 1px solid rgba(0,0,0,0.12)
</style>
