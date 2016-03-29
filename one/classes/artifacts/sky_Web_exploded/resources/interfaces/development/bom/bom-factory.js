/**
 * Created by zhangjh on 2015/7/10.
 */
(function ($) {

    "use strict";

    var path = $.basepath();
    var title_type = "成衣厂_";
    var saveFactoryFunURL = path + "/development/bom/saveFactoryFun";
    var bom_selectURL = path + "/system/baseinfo/bom_select";
    var fileUploadURL = path + "/files/upload";
    //var $fileListLi = $("#filesList");
    //var sketchUrlUidUploadFileInfos = [];
    //var specificationUrlUidUploadFileInfos = [];
    var isSubmitAction = 'N';

    $.extend({
        initFactory: initFactory,
        factoryQuoteInfos: buildFactoryQuoteInfos
    });

    /**
     *
     * @param index
     * @returns {{}}
     */
    function buildFactoryQuoteInfo(index) {

        var factoryQuoteInfo = {};

        factoryQuoteInfo.factoryQuoteId = $("#factoryQuoteId" + index).val();
        factoryQuoteInfo.offerAmount = $("#offerAmount" + index).val();
        factoryQuoteInfo.fabricsEndDate = $("#fabricsEndDate" + index).val();
        factoryQuoteInfo.accessoriesEndDate = $("#accessoriesEndDate" + index).val();
        factoryQuoteInfo.preOfferDate = $("#preOfferDate" + index).val();
        factoryQuoteInfo.clothReceivedDate = $("#clothReceivedDate" + index).val();
        factoryQuoteInfo.quoteReference = $("#quoteReference" + index).val();
        factoryQuoteInfo.spId = $("#spIdC" + index).val();
        factoryQuoteInfo.euroPrice = $("#euroPrice" + index).val();
        factoryQuoteInfo.factoryOffer = $("#factoryOffer" + index).val();
        factoryQuoteInfo.factoryMargins = $("#factoryMargins" + index).val();
        factoryQuoteInfo.nameNum = index;

        var productionInstruction = {};
        productionInstruction.factoryQuoteId = $("#factoryQuoteId" + index).val();
        productionInstruction.productionInstructionId = $("#productionInstructionId" + index).val();
        productionInstruction.cropRequirements = $("#cropRequirements" + index).val();
        productionInstruction.offerAmount = $("#offerAmount" + index).val();
        productionInstruction.spId = $("#spIdC" + index).val();
        productionInstruction.clothReceivedDate = $("#clothReceivedDate" + index).val();
        productionInstruction.qualityRequirements = $("#qualityRequirements" + index).val();
        productionInstruction.finishPressingRequirements = $("#finishPressingRequirements" + index).val();
        productionInstruction.spcialTech = $("#spcialTech" + index).val();
        productionInstruction.packingRequirements = $("#packingRequirements" + index).val();
        productionInstruction.overstitch = $("#overstitch" + index).val();
        productionInstruction.overstitchSpace = $("#overstitchSpace" + index).val();
        productionInstruction.blindstitch = $("#blindstitch" + index).val();
        productionInstruction.blindstitchSpace = $("#blindstitchSpace" + index).val();
        productionInstruction.overlock = $("#overlock" + index).val();
        productionInstruction.overlockSpace = $("#overlockSpace" + index).val();
        productionInstruction.trademarkCode = $("#trademarkCode" + index).val();
        productionInstruction.trademarkRemark = $("#trademarkRemark" + index).val();
        productionInstruction.scaleCode = $("#scaleCode" + index).val();
        productionInstruction.scaleRemark = $("#scaleRemark" + index).val();
        productionInstruction.rinsingMarksCode = $("#rinsingMarksCode" + index).val();
        productionInstruction.rinsingMarksRemark = $("#rinsingMarksRemark" + index).val();
        productionInstruction.sketchUrlUid = $("#sketchUrlUid" + index).val();
        productionInstruction.specificationUrlUid = $("#specificationUrlUid" + index).val();
        //上传文件
        var sketchUrlUidUploadFileInfos = [];
        var specificationUrlUidUploadFileInfos = [];

        try {
            var initialPreviewConfigs = $("#sketchUrlUid" + index).fileinput().data()["fileinput"].ajaxRequests[0].responseJSON.initialPreviewConfig;//上传文件返回的数据
            $.buildUploadedFileInfos(sketchUrlUidUploadFileInfos, initialPreviewConfigs);
        } catch (e) {

        }

        try {
            var initialPreviewConfigs = $("#specificationUrlUid" + index).fileinput().data()["fileinput"].ajaxRequests[0].responseJSON.initialPreviewConfig;//上传文件返回的数据
            $.buildUploadedFileInfos(specificationUrlUidUploadFileInfos, initialPreviewConfigs);
        } catch (e) {

        }

        productionInstruction.sketchUrlUidUploadFileInfos = sketchUrlUidUploadFileInfos;
        productionInstruction.specificationUrlUidUploadFileInfos = specificationUrlUidUploadFileInfos;
        //
        factoryQuoteInfo.productionInstruction = productionInstruction;

        return factoryQuoteInfo;
    }

    /**
     * 报价信息
     * @returns {Array}
     */
    function buildFactoryQuoteInfos() {
        var size = $("div[id^=factoryAllInfoId]").length;
        var factoryQuoteInfos = [];
        for (var index = 1; index <= size; index++) {
            var factoryQuoteInfo = buildFactoryQuoteInfo(index);
            factoryQuoteInfos.push(factoryQuoteInfo);
        }
        return factoryQuoteInfos;
    }


    function initFactory(factoryItems) {
        for (var index = 0; index < factoryItems.length; index++) {
            addFactory(factoryItems[index]);
        }
    }


    /**
     * 启动表单校验监听
     * @param _id 当前表单序号
     */
    var startBootstrapValidatorListner = function (_id) {
        $('#factoryFormId' + _id).bootstrapValidator({
            //live: 'disabled',
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: fieldsDesc
        }).on('success.form.bv', function (e) { //表单校验成功，ajax提交数据
            console.log("包材_" + _id + "验证成功");
            saveFactoryFun(_id);
        });
    }

    /**
     * 初始化包材nextIdNum的表单信息
     * @param nextIdNum 包材序号
     * @param _factoryInfo 包材表单值
     */
    function initFactoryFields(nextIdNum, _factoryInfo) {

        //保存值
        var factoryInfo = $.extend({}, _factoryInfo);

        bom.factoryItems.push(factoryInfo);

        //初始化赋值
        Object.keys(_factoryInfo).map(function (key) {
            var keyVal = _factoryInfo[key];
            if (key === 'spId') {
                //下拉框
                $("#spIdC" + nextIdNum).val(keyVal);
            } else {

                //下拉框
                $("#" + key + nextIdNum).val(keyVal);
            }
        });

        var productionInstruction = _factoryInfo["productionInstruction"];
        if (null != productionInstruction) {
            Object.keys(productionInstruction).map(function (key_2) {//遍历工艺单信息
                if (key_2 != 'clothReceivedDate') {//避免覆盖上面工厂信息中的clothReceivedDate
                    $("#" + key_2 + nextIdNum).val(productionInstruction[key_2]);
                }
            });

        }
        initFileInput(nextIdNum, _factoryInfo);

    }

    /**
     * 初始化上传插件
     * @param nextIdNum
     * @param _factoryInfo
     */
    function initFileInput(nextIdNum, _factoryInfo) {


        var sketchUrlUidFileinfosMap = null;
        var specificationUrlUidFileinfosMap = null;

        if (null != _factoryInfo && null != _factoryInfo["productionInstruction"]) {
            sketchUrlUidFileinfosMap = _factoryInfo["productionInstruction"]["sketchUrlUidFileinfosMap"];
            specificationUrlUidFileinfosMap = _factoryInfo["productionInstruction"]["specificationUrlUidFileinfosMap"];
        }

        var $sketchUrlUid = $("#sketchUrlUid" + nextIdNum);
        $.loadFileInput($sketchUrlUid, null, sketchUrlUidFileinfosMap, fileUploadURL);
        $.fileInputAddListenr(null, $sketchUrlUid, null, function () {
        }, getIsSubmitAction);

        var $specificationUrlUid = $("#specificationUrlUid" + nextIdNum);
        $.loadFileInput($specificationUrlUid, null, specificationUrlUidFileinfosMap, fileUploadURL);

        $.fileInputAddListenr(null, $specificationUrlUid, null, function () {
        }, getIsSubmitAction);


    }


    function getIsSubmitAction() {
        return isSubmitAction;
    }

    /**
     * 添加包材
     */
    var addFactory = function (factoryInfo) {

        var size = $("div[id^=factoryAllInfoId]").length;
        var nextIdNum = size + 1;
        var data = {
            "factory": [
                {

                    "currenId": nextIdNum,
                    "factoryDivId": "factoryDivId" + nextIdNum,
                    "factoryTitleId": "factoryTitleId" + nextIdNum,
                    "factoryQuoteId": "factoryQuoteId" + nextIdNum,
                    "factoryTitleName": title_type + nextIdNum,
                    "factoryEyeId": "factoryEyeId" + nextIdNum,
                    "factoryTrashId": "factoryTrashId" + nextIdNum,
                    "factoryRepeatId": "factoryRepeatId" + nextIdNum,
                    "factoryFloppyDiskId": "factoryFloppyDiskId" + nextIdNum,
                    "factoryFormId": "factoryFormId" + nextIdNum,
                    "factoryAllInfoId": "factoryAllInfoId" + nextIdNum,
                    "factoryDetailId": "factoryDetailId" + nextIdNum,
                    "spIdC": "spIdC" + nextIdNum,
                    "offerAmount": "offerAmount" + nextIdNum,
                    "quoteReference": "quoteReference" + nextIdNum,
                    "preOfferDate": "preOfferDate" + nextIdNum,
                    "clothReceivedDate": "clothReceivedDate" + nextIdNum,
                    "fabricsEndDate": "fabricsEndDate" + nextIdNum,
                    "accessoriesEndDate": "accessoriesEndDate" + nextIdNum,
                    "factoryOffer": "factoryOffer" + nextIdNum,
                    "factoryMargins": "factoryMargins" + nextIdNum,
                    //"lpPrice": "lpPrice" + nextIdNum,
                    "euroPrice": "euroPrice" + nextIdNum,

                    //"exchangeCosts": "exchangeCosts" + nextIdNum,
                    //"costing": "costing" + nextIdNum
                    "productionInstructionId": "productionInstructionId" + nextIdNum,
                    "productionInstructionDetailId": "productionInstructionDetailId" + nextIdNum,
                    "productionInstructionTitleName": "productionInstructionTitleName" + nextIdNum,
                    "cropRequirements": "cropRequirements" + nextIdNum,
                    "qualityRequirements": "qualityRequirements" + nextIdNum,
                    "finishPressingRequirements": "finishPressingRequirements" + nextIdNum,
                    "spcialTech": "spcialTech" + nextIdNum,
                    "packingRequirements": "packingRequirements" + nextIdNum,
                    "overstitch": "overstitch" + nextIdNum,
                    "overstitchSpace": "overstitchSpace" + nextIdNum,
                    "blindstitch": "blindstitch" + nextIdNum,
                    "blindstitchSpace": "blindstitchSpace" + nextIdNum,
                    "overlock": "overlock" + nextIdNum,
                    "overlockSpace": "overlockSpace" + nextIdNum,
                    "trademarkCode": "trademarkCode" + nextIdNum,
                    "trademarkRemark": "trademarkRemark" + nextIdNum,
                    "scaleCode": "scaleCode" + nextIdNum,
                    "scaleRemark": "scaleRemark" + nextIdNum,
                    "rinsingMarksCode": "rinsingMarksCode" + nextIdNum,
                    "rinsingMarksRemark": "rinsingMarksRemark" + nextIdNum,
                    "sketchUrlUid": "sketchUrlUid" + nextIdNum,
                    "specificationUrlUid": "specificationUrlUid" + nextIdNum
                }
            ]
        };

        var myTemplate = Handlebars.compile($("#factory-template").html());
        $("#factoryItemInfo").append(myTemplate(data));


        $("div[id^=factoryAllInfoId]").hide(); //页面加载时，包材全部隐藏

        $("span[id^=factoryEyeId]").removeClass("glyphicon glyphicon-eye-open").addClass("glyphicon glyphicon-eye-close");

        //加载下拉列表数据,付初始值
        reloadFactoryDetailSelectData(nextIdNum, function () {
            if (factoryInfo != null) {
                initFactoryFields(nextIdNum, factoryInfo);
                //表单字段监听
                startBootstrapValidatorListner(nextIdNum);
            } else {
                initFileInput(nextIdNum, factoryInfo);
            }


        });


    }


    //删除包材
    function deleteFactoryById(idNum) {
        bom.factoryItems.splice(idNum - 1, 1);
    }

    function copyFactory(idNum) {
        if (bom.factoryItems[idNum] == undefined || $.trim(bom.factoryItems[idNum]) == '') {
            bootbox.alert("请先保存包材_" + idNum);
        }
    }

    var deleteFun = function (idNum) {
        //当前包材idNum
        var curId = idNum;
        var factoryArrLength = $("div[id^=factoryAllInfoId]").length;
        //删除当前包材和之后的所有包材
        for (var index = curId; index <= factoryArrLength; index++) {
            //$("div[id^=factoryAllInfoId]")
            $("#factoryDivId" + index).remove();
            //保存当前节点之后的数据
            if (index >= curId) {

                if (index == curId) {
                    deleteFactoryById(index);
                }


                var formDataStr = $("#factoryFormId" + (index + 1)).serialize();
                if (formDataStr != '') {
                    saveFactoryById(index, formDataStr);
                }


            }
        }
        //重新生成包材
        var maxFactoryId = factoryArrLength - 1;

        for (var index = curId; index <= maxFactoryId; index++) {
            addFactory();
        }

        $("div[id^=factoryAllInfoId]").hide(); //全部隐藏


    }

    var doDel = function (result, idNum) {
        if (result) {
            deleteFun(idNum);
        }
    }

    var trashFactorySelect = function (_this, idNum) {
        var saveFlag = bom.factoryItems[idNum - 1].saveFlag;
        if (saveFlag == true) {
            bootbox.confirm("包材_" + idNum + "已保存，确定要删除", function (result) {
                doDel(result, idNum);
            });
        }
        else {
            deleteFun(idNum);
        }

    }

    var saveFactory = function (_this, idNum) {
        $('#factoryFormId' + idNum).bootstrapValidator('validate');
    }

    var saveFactoryFun = function (idNum) {
        var formDataStr = $("#factoryFormId" + idNum).serialize();
        saveFactoryById(idNum, formDataStr);


        bom.factoryItems[idNum - 1].saveFlag = true;//已保存

    }


    var saveFactoryById = function (idNum, formDataStr) {
        var jsonObj = $.strToJson(formDataStr);
        bom.factoryItems[idNum - 1] = jsonObj;
        if (!$("#factoryAllInfoId" + idNum).is(':hidden')) {
            bom.factoryItems[idNum - 1].showFlag = true;//是否显示
        }
        bom.factoryItems[idNum - 1].currenId = idNum;//当前序号
        //$.sendRestFulAjax(saveFactoryFunURL, jsonObj, 'GET', 'json', function (data) {
        //    _doFactorySuccess_info(data, idNum);
        //});
    }


    /**
     * 显示或者展示div
     * @param _this
     * @param idNum
     */
    var showOrHideFactory = function (_this, idNum) {
        var factoryEyeId = "#factoryEyeId" + idNum;
        var factoryTrashId = "#factoryTrashId" + idNum;
        $("#factoryAllInfoId" + idNum).toggle(300,
            function () {
                if ($(this).is(':hidden')) {
                    $(factoryEyeId).removeClass("glyphicon glyphicon-eye-open").addClass("glyphicon glyphicon-eye-close");
                    $(factoryTrashId).addClass("disabled");
                }
                else {
                    $(factoryEyeId).removeClass("glyphicon glyphicon-eye-close").addClass("glyphicon glyphicon-eye-open");
                    $(factoryTrashId).removeClass("disabled");
                }
            }
        );
    }

    /**
     * 当后台的基础信息修改后，点击刷新，可以刷新cookies信息
     */
    var refreshFactorySelect = function (_this, idNum) {
        var factoryQuoteInfo = buildFactoryQuoteInfo(idNum);
        reloadBomSelect(idNum, function () {
            initFactoryFields(idNum, factoryQuoteInfo);
        });
    }


    var reloadBomSelect = function (idNum, callback) {
        $.sendRestFulAjax(bom_selectURL, null, 'GET', 'json', function (data) {
            _doFactorySuccess_info(data, idNum, callback);
        });
    }

    //第一次初始化下拉列表
    var reloadFactoryDetailSelectData = function (idNum, callback) {
        reloadBomSelect(idNum, callback);

        //if ($.cookie('systemBaseMaps') == undefined) {
        //    //第一次初始化下拉列表，存放到cookies中
        //    $.sendRestFulAjax(path + "/system/baseinfo/bom_select", null, 'GET', 'json', function (data) {
        //        _doFactorySuccess_info(data, idNum);
        //    });
        //}
        //else {
        //    //第二次，直接从cookies中读取
        //    initFactorySelect(nextIdNum);
        //}
    }


    //cookie重新赋值，给下拉列表赋值
    var _doFactorySuccess_info = function (_data, idNum, callback) {
        //$.cookie('systemBaseMaps', JSON.stringify(_data));//JSON 数据转化成字符串
        initFactorySelect(_data, idNum, callback);
    }

    //给下拉列表赋值
    var initFactorySelect = function (_data, idNum, callback) {
        //console.info("加载包材" + idNum + "的下拉列表");
        var data = _data;//JSON.parse($.cookie('systemBaseMaps'));//字符串转化成JSON 数据


        //
        //供应商
        var spItems = data["spItems"];
        $("#spIdC" + idNum).empty();
        $("<option></option>").val('').text("请选择...").appendTo($("#spIdC" + idNum));
        $.each(spItems, function (i, item) {
            $("<option></option>")
                .val(item["natrualkey"])
                .text(item["name"])
                .appendTo($("#spIdC" + idNum));
        });


        if ($.isFunction(callback)) {
            callback();
        }

    }

    /**
     *
     * @type {{bomId: string, spIdC: string, nameNum: string, factoryName: string, offerAmount: string, clothReceivedDate: string, quoteReference: string, preOfferDate: string, accessoriesEndDate: string, serialNumber: string, fabricsEndDate: string, exchangeCosts: string, euroPrice: string, costing: string, showFlag: boolean, saveFlag: boolean, delFlag: boolean, currenId: number}}
     */
    var factory = {
        bomId: "",
        spIdC: "",
        nameNum: "",
        factoryName: "",
        offerAmount: "",
        clothReceivedDate: "",
        quoteReference: "",
        preOfferDate: "",
        accessoriesEndDate: "",
        serialNumber: "",
        fabricsEndDate: "",
        exchangeCosts: "",
        euroPrice: "",
        costing: "",
        showFlag: false,//页面是否展示
        saveFlag: false,//是否已保存
        delFlag: false,//是否已删除
        currenId: 0 //包材下标
    }


    /**
     * 新增/修改校验字段描述
     * @returns {{name: {validators: {notEmpty: {message: string}}}, customerId: {validators: {notEmpty: {message: string}}}}}
     */
    var fieldsDesc =
    {
        offerAmount: {
            validators: {
                notEmpty: {
                    message: '订单数量为必填项'
                }
            }
        },
        quoteReference: {
            validators: {
                notEmpty: {
                    message: '报价参考为必填项'
                }
            }
        },
        preOfferDate: {
            validators: {
                notEmpty: {
                    message: '成衣报价时间为必填项'
                }
            }
        },
        clothReceivedDate: {
            validators: {
                notEmpty: {
                    message: '材质为必填项'
                }
            }
        },
        fabricsEndDate: {
            validators: {
                notEmpty: {
                    message: '面料交货时间为必填项'
                }
            }
        },
        accessoriesEndDate: {
            validators: {
                notEmpty: {
                    message: '品名为必填项'
                }
            }
        },
        euroPrice: {
            validators: {
                notEmpty: {
                    message: '工厂欧元报价为必填项'
                }
            }
        },
        costing: {
            validators: {
                notEmpty: {
                    message: '用量为必填项'
                }
            }
        },
        exchangeCosts: {
            validators: {
                notEmpty: {
                    message: '换汇成本为必填项'
                }
            }
        },
        lpPrice: {
            validators: {
                notEmpty: {
                    message: '包装费为必填项'
                }
            }
        },
        attritionRate: {
            validators: {
                notEmpty: {
                    message: '损耗率为必填项'
                }
            }
        },
        factoryOffer: {
            validators: {
                notEmpty: {
                    message: '工厂报价利润率为必填项'
                }
            }
        },
        totalAmount: {
            validators: {
                notEmpty: {
                    message: '尺码总数量为必填项'
                }
            }
        },
        totalPrice: {
            validators: {
                notEmpty: {
                    message: '总价为必填项'
                }
            }
        }

    };

    /**
     * 面板内容初始化
     */
    $(document).ready(function () {

        //$("#bomDescDetail").hide();

        //第一步，页面加载时，加载所有数据/分步加载数据

        //页面加载时，包材全部隐藏
        $("div[id^=factoryAllInfoId]").hide();

        //点击添加包材
        $("#imgAddFactory").click(function () {
            addFactory();
            //赋初始化值：保存标志，显示标志
            var size = $("div[id^=factoryAllInfoId]").length;
            bom.factoryItems[size - 1] = factory;
        });

    });
    var bom = {
        projectId: "",//项目id
        bomId: "",//BOMId
        factoryItems: [],//所有包材
    }
    window.saveFactory = saveFactory;
    window.refreshFactorySelect = refreshFactorySelect;
    window.trashFactorySelect = trashFactorySelect;
    window.showOrHideFactory = showOrHideFactory;
    window.copyFactory = copyFactory;

}(jQuery));