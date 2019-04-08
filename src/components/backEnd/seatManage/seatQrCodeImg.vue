<template>
  <div class="seatQrCodeImg" style="height: 500px;overflow: scroll">
    <!--<template v-for="(item, index) in tables" >
      <span> {{item}} </span>
      <template v-for="(items, index) in item.children" >
        <span> &#45;&#45;&#45;&#45;{{items}} </span>
      </template>
    </template>-->
    <el-row>
      <el-col :span="6" v-for="(item, index) in Tables" :key="index" :offset="1">
        <template >
          <el-card shadow="hover" :body-style="{ padding: '10px',textAlign:'center',height:'250px',position: 'relative'}" >
            <el-tooltip placement="top" :content="item.tDesc">
              <el-tag style="font-size: 30px;font-weight: bolder;position: absolute;left: 38%;bottom: 50%;">
                {{item.tNum}}
              </el-tag>
            </el-tooltip>

            <!--左上角-->
            <el-tooltip placement="top" >
              <div slot="content">
                <span id='qcCodeA'>
                  <div style="font-size: 20px;font-weight: bolder;margin-left: 130px">
                    {{item.tNum}}{{item.children[0].sSeatnum}}
                  </div>
                  <div style="margin: 0 auto">
                     <img :src="imgname" ><br/>
                  </div>
                </span>
                <el-button type="info" round size="mini" @click="getQrCode(item.children[0].sId)">更新二维码</el-button>
                <el-button type="danger" round size="mini" v-print="'#qcCodeA'">打印二维码</el-button>
              </div>
              <el-button style="position: absolute;left: 0%;top: 0%;">{{item.children[0].sSeatnum}}</el-button>
            </el-tooltip>
            <!--右上角-->
            <el-tooltip placement="top">
              <div slot="content">
                <span id='qcCodeB'>
                  <div style="font-size: 20px;font-weight: bolder;margin-left: 130px">
                    {{item.tNum}}{{item.children[1].sSeatnum}}
                  </div>
                  <div style="margin: 0 auto">
                     <img :src="imgname" ><br/>
                  </div>
                </span>

                <el-button type="info" round size="mini" @click="getQrCode(item.children[1].sId)">更新二维码</el-button>
                <el-button type="danger" round size="mini" v-print="'#qcCodeB'">打印二维码</el-button>
              </div>
              <el-button style="position: absolute;right: 0%;top: 0%;">{{item.children[1].sSeatnum}}</el-button>
            </el-tooltip>
            <!--左上角-->
            <el-tooltip placement="top">
              <div slot="content">
                <span id='qcCodeC'>
                  <div style="font-size: 20px;font-weight: bolder;margin-left: 130px">
                    {{item.tNum}}{{item.children[2].sSeatnum}}
                  </div>
                  <div style="margin: 0 auto">
                     <img :src="imgname" ><br/>
                  </div>
                </span>
                <el-button type="info" round size="mini" @click="getQrCode(item.children[2].sId)">更新二维码</el-button>
                <el-button type="danger" round size="mini" v-print="'#qcCodeC'">打印二维码</el-button>
              </div>
              <el-button style="position: absolute;left: -5%;bottom: 0%;">{{item.children[2].sSeatnum}}</el-button>
            </el-tooltip>
            <!--右下角-->
            <el-tooltip placement="top">
              <div slot="content">
                <span id='qcCodeD'>
                  <div style="font-size: 20px;font-weight: bolder;margin-left: 130px">
                    {{item.tNum}}{{item.children[3].sSeatnum}}
                  </div>
                  <div style="margin: 0 auto">
                     <img :src="imgname" ><br/>
                  </div>
                </span>
                <el-button type="info" round size="mini" @click="getQrCode(item.children[3].sId)">更新二维码</el-button>
                <el-button type="danger" round size="mini" v-print="'#qcCodeD'">打印二维码</el-button>
              </div>
              <el-button style="position: absolute;right: 0%;bottom: 0%;">{{item.children[3].sSeatnum}}</el-button>
            </el-tooltip>
          </el-card>
          <div style="width: 20px;height: 20px"></div>
        </template>

      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "seatQrCodeImg",
      data() {
        return {
          tables:[],
          Tables:[
            {
              children:[
                {
                sSeatnum:'A'
                },
                {
                  sSeatnum:'B'
                },
                {
                  sSeatnum:'C'
                },
                {
                  sSeatnum:'D'
                },
              ]
            }
          ],
          Seats:[],
          imgname:'',
          base64:'',
        }
      },
      created:function(){
        this.getSeats();
        this.$nextTick(function () {
          this.getTables();
        })
      },
      mounted(){
        this.chang()
      },
      watch:{
        tables(){
          setTimeout(()=>{
            this.chang()
          },1000)

        },

      },
      methods:{
        chang(){
          for(let i=0;i<this.tables.length ; i++ ){
            this.tables[i].children = [];
            for(let j=0;j<this.Seats.length ; j++ ){
              if(this.tables[i].tId == this.Seats[j].tId){
                this.tables[i].children.push(this.Seats[j])
              }
            }
          }
          this.Tables = this.tables
          console.log("tables")
          console.log(this.tables)

        },
        getQrCode(seatId){
          var that = this;
          this.$axios.get(this.COMMON.backUrl+'/orderSystem/SystemManager/qrcodeimg?sId='+seatId)
            .then(function (response)
            {
              that.base64 = response.data
              that.imgname = 'data:image/jpg;base64,'+that.base64+''
            })
            .catch(function (error)
            {
              console.log(error)
            })
        },
        getTables(){
          let table ={}
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/TableAndMenu/queryTable",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(table)
          }).then((res)=>{
            that.tables = res.data.data
           /* console.log(that.tables)*/
          }).catch(function (error)
          {
            console.log(error)
          })
        },
        getSeats(){
          let seat = {}
          let that =this
          this.$axios({
            method:"post",
            url:this.COMMON.backUrl+"orderSystem/TableAndMenu/querySeats",
            headers:{
              'Content-type': 'application/json'
            },
            data: JSON.stringify(seat)
          }).then((res)=>{
            that.Seats = res.data.data
            //console.log(that.Seats)
           /* that.chang()*/
          }).catch(function (error)
          {
            console.log(error)
          })
        },
      }
    }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
