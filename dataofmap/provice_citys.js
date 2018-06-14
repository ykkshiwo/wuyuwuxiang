const provice_city = { "北京市": ["北京市"], "天津市": ["天津市"], "河北省": ["邢台市", "邯郸市", "秦皇岛市", "唐山市", "石家庄市", "沧州市", "承德市", "张家口市", "保定市", "衡水市", "廊坊市", "省直辖县级行政区划"], "山西省": ["长治市", "阳泉市", "大同市", "太原市", "忻州市", "运城市", "晋中市", "朔州市", "晋城市", "吕梁市", "临汾市"], "内蒙古自治区": ["乌海市", "包头市", "呼和浩特市", "乌兰察布市", "巴彦淖尔市", "呼伦贝尔市", "鄂尔多斯市", "通辽市", "赤峰市", "锡林郭勒盟", "兴安盟", "阿拉善盟"], "辽宁省": ["盘锦市", "辽阳市", "营口市", "锦州市", "丹东市", "本溪市", "抚顺市", "鞍山市", "大连市", "沈阳市", "阜新市", "葫芦岛市", "朝阳市", "铁岭市"], "吉林省": ["松原市", "白山市", "通化市", "辽源市", "四平市", "吉林市", "长春市", "白城市", "延边朝鲜族自治州"], "黑龙江省": ["双鸭山市", "鹤岗市", "鸡西市", "齐齐哈尔市", "哈尔滨市", "七台河市", "佳木斯市", "伊春市", "绥化市", "黑河市", "牡丹江市", "大兴安岭地区", "大庆市"], "上海市": ["上海市"], "江苏省": ["镇江市", "扬州市", "淮安市", "连云港市", "南通市", "苏州市", "常州市", "徐州市", "无锡市", "南京市", "盐城市", "宿迁市", "泰州市"], "浙江省": ["台州市", "金华市", "绍兴市", "湖州市", "嘉兴市", "温州市", "宁波市", "杭州市", "舟山市", "衢州市", "丽水市"], "安徽省": ["淮北市", "马鞍山市", "淮南市", "蚌埠市", "芜湖市", "合肥市", "安庆市", "铜陵市", "池州市", "亳州市", "六安市", "宿州市", "阜阳市", "滁州市", "黄山市", "宣城市"], "福建省": ["泉州市", "三明市", "莆田市", "厦门市", "福州市", "宁德市", "龙岩市", "南平市", "漳州市"], "江西省": ["九江市", "萍乡市", "景德镇市", "南昌市", "宜春市", "吉安市", "赣州市", "鹰潭市", "新余市", "上饶市", "抚州市"], "山东省": ["东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "济南市", "青岛市", "淄博市", "聊城市", "滨州市", "菏泽市", "威海市", "日照市", "莱芜市", "临沂市", "德州市", "枣庄市"], "河南省": ["郑州市", "开封市", "许昌市", "漯河市", "三门峡市", "南阳市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "商丘市", "信阳市", "周口市", "驻马店市", "省直辖县级行政区划"], "湖北省": ["武汉市", "荆州市", "黄冈市", "咸宁市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "随州市", "恩施土家族苗族自治州", "省直辖县级行政区划"], "湖南省": ["郴州市", "永州市", "益阳市", "长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "怀化市", "娄底市", "湘西土家族苗族自治州"], "广东省": ["湛江市", "茂名市", "广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "中山市", "东莞市", "肇庆市", "惠州市", "梅州市", "汕尾市", "河源市", "阳江市", "清远市", "潮州市", "揭阳市", "云浮市"], "广西壮族自治区": ["钦州市", "贵港市", "玉林市", "南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "百色市", "贺州市", "河池市", "来宾市", "崇左市"], "海南省": ["海口市", "三亚市", "三沙市", "儋州市", "省直辖县级行政区划"], "重庆市": ["市辖区", "县"], "四川省": ["成都市", "自贡市", "内江市", "乐山市", "南充市", "眉山市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "资阳市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州"], "贵州省": ["贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州", "黔南布依族苗族自治州"], "云南省": ["昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州", "西双版纳傣族自治州", "大理白族自治州"], "西藏自治区": ["拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲地区", "阿里地区"], "陕西省": ["铜川市", "西安市", "咸阳市", "宝鸡市", "商洛市", "延安市", "渭南市", "榆林市", "汉中市", "安康市"], "甘肃省": ["兰州市", "金昌市", "嘉峪关市", "庆阳市", "陇南市", "定西市", "天水市", "白银市", "张掖市", "武威市", "酒泉市", "平凉市", "甘南藏族自治州", "临夏回族自治州"], "青海省": ["海东市", "西宁市", "海北藏族自治州", "黄南藏族自治州", "果洛藏族自治州", "海南藏族自治州", "海西蒙古族藏族自治州", "玉树藏族自治州"], "宁夏回族自治区": ["银川市", "吴忠市", "石嘴山市", "中卫市", "固原市"], "新疆维吾尔族自治区": ["乌鲁木齐", "克拉玛依", "喀什地区", "阿克苏地区", "和田地区", "吐鲁番地区", "哈密地区", "塔城地区", "阿勒泰地区", "克孜勒苏柯尔克孜自治州", "博尔塔拉蒙古自治州", "昌吉回族自治州", "巴音郭楞蒙古自治州", "伊犁哈萨克自治州"], "台湾省": ["台北", "高雄", "台南", "新北", "台中", "桃园"], "香港特别行政区": ["香港特别行政区"], "澳门特别行政区": ["澳门特别行政区"]}

module.exports = {
  provice_city: provice_city
}