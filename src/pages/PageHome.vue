<template>
  <q-page class ="relative-position">
    <q-scroll-area class="absolute full-width full-height">
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
                <img src="src/assets/Photo.png">
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
          :key="tweet.id"
          class="tweet q-py-md"
          >
            <q-item-section avatar>
              <q-avatar size="xl">
                  <img src="src/assets/Photo.png">
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
                <q-btn
                  @click = "toggledLiked(tweet)"
                  flat
                  round
                  :color="tweet.liked ? 'red' : 'grey' "
                  :icon="tweet.liked ? 'fas fa-heart' : 'far fa-heart'"
                  size="sm"
                />
                <q-btn @click = "deleteTweet(tweet)" flat round color="grey" icon="far fa-trash" size="sm"/>
              </div>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
  </q-scroll-area>
  </q-page>
</template>

<script>
import { collection, doc, updateDoc, deleteDoc, onSnapshot, orderBy, addDoc, query } from 'firebase/firestore'
import db from 'src/boot/firebase'
import { formatDistance } from 'date-fns'
export default {
  name: 'PageHome',
  data () {
    return {
      newTweet: '',
      Tweet: [
        {
          id: 'ID1',
          content: 'First Tweet From VS && Heart Not Updated in this Tweet',
          date: 1719748951125,
          liked: true
        }
      ]
    }
  },
  methods: {
    formatRelativeDate (value) {
      return formatDistance(new Date(value), new Date())
    },
    async addNewTweet () {
      if (this.newTweet.trim() === '') return

      const tweetData = {
        content: this.newTweet,
        date: Date.now(),
        liked: false
      }
      try {
        await addDoc(collection(db, 'tweet'), tweetData)
        this.newTweet = ''
      } catch (error) {
        console.error('Error adding new tweet:', error)
      }
    },
    async toggledLiked (tweet) {
      try {
        await updateDoc(doc(db, 'tweet', tweet.id), {
          liked: !tweet.liked
        })
        console.log('Tweet like status updated successfully!')
      } catch (error) {
        console.error('Error updating tweet like status:', error)
      }
    },
    async deleteTweet (tweet) {
      try {
        const tweetDocRef = doc(db, 'tweet', tweet.id)
        await deleteDoc(tweetDocRef)
        console.log('Document successfully deleted!')
      } catch (error) {
        console.error('Error removing document:', error)
      }
    }
  },
  mounted () {
    const tweetsCollection = collection(db, 'tweet')
    const tweetsQuery = query(tweetsCollection, orderBy('date'))
    // Use onSnapshot with the query to listen for changes
    onSnapshot(tweetsQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const tweetChange = { id: change.doc.id, ...change.doc.data() }
        if (change.type === 'added') {
          console.log('New Tweet : ', tweetChange, tweetChange.id)
          this.Tweet.unshift(tweetChange)
        }
        if (change.type === 'modified') {
          console.log('Modified Tweet : ', tweetChange)
          const index = this.Tweet.findIndex(tweet => tweet.id === tweetChange.id)
          Object.assign(this.Tweet[index], tweetChange)
        }
        if (change.type === 'removed') {
          console.log('Removed Tweet:', tweetChange)
          this.Tweet = this.Tweet.filter(tweet => tweet.id !== tweetChange.id)
        }
      })
    })
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
