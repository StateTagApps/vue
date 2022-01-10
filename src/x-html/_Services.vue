<script>
export default {
  props: {
    locus: {
      type: String,
      default: null
    },

    src: {
      //api only
      type: String,
      required: false
    },

    service: {
      type: String,
      default: ['state', 'api', 'socket', 'nebula'][0]
    },

    connectingMsg: {
      type: String,
      default: 'connecting...'
    },

    waitingMsg: {
      type: String,
      default: 'waiting...'
    }
  },


  data: function () {
    return {
      privateContent: null,
      privateLoading: true,
    }
  },

  computed: {

    serviceContent: {
      get: function () {
        switch (true) {
          case (this.service == 'state'):
            return this.$read(this.locus);

          case (this.privateLoading):
            return {
              api: 'loading...',
              socket: (this.$socket.disconnected) ? this.connectingMsg : this.waitingMsg
            }[this.service];

          case (!_.isNull(this.privateContent)):
            return this.privateContent;

          default:
            return 'error';
        }
      },
      set: function (val) {
        switch (this.service) {

          case 'state':
            this.$write(this.locus, val);
            this.txt = '';
            break;

          case 'nebula':
            this.$nebula(this.locus, val);
            this.txt = '';
            break;
        }

      },
    }
  },

  methods: {

    listenForContentFromSocket: function (event) {
      this.$onSocket(event, payload => {
        if (_.isEmpty(this.locus)) {
          this.privateContent = payload;
        } else {
          this.privateContent = _.get(payload, this.locus);
        }
        this.privateLoading = false;
      });
    },

    setContentFromSrc: function (src) {

      if (!this.isUrl(src)) {
        src = stateTagApp.api
            .concat(src);
      }

      let data = this.$data;
      let locus = this.locus

      this.$api(src, 'setContentFromSrc')
          .then(function (response) {
            if (_.isEmpty(locus)) {
              data.privateContent = response.data;
            } else {
              data.privateContent = _.get(response.data, locus);
            }
            data.privateLoading = false;
          }.bind(data)
              .bind(locus));
    }
  },

  mounted: function () {
    switch (this.service) {
      case 'state':
        this.privateLoading = false;
        break;

      case 'api':
        this.setContentFromSrc(this.src);
        break;

      case 'socket':
        this.listenForContentFromSocket(this.src);
        break;

      case 'nebula':
        this.$onNebula(this.locus, (val) => {
          this.privateLoading = false;
          this.privateContent = val;
        })
        break;
    }
  }
}
</script>