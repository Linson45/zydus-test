// eslint-disable-next-line no-unused-vars
const htmlDot = '<div class="dots"></div><div class="dots"></div><div class="dots"></div>';

const htmlStyle = '#current_showcase,#open_showcase{cursor: pointer !important;}.vaslides img{width:162px;height:122px}.vaslides{margin:0 5px;display:inline-block;white-space:nowrap;width:170px;height:125px;vertical-align:top;padding:4px;background-color:rgba(0,163,228,.4);box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;cursor:pointer;z-index:9999}.vaslides:first-child{margin-left:0}.vaslides:last-child{margin-right:0}.box_btn{background-image: url("open.png");}.active>.box_btn{background-image: url("close.png");}';

export const webViewJs = `
$(document).ready(function () {
    $('.box_btn').html('');
    $("<style>").text('${htmlStyle}').appendTo("head");
    window.mainThat.reRenderThumbnails = () => {
        $('.left_menu span').removeClass('active');
        window.mainThat.resetThumbnails();
        $('.left_menu #current_showcase').addClass('active');
        if (window.mainThat.thumbs && window.mainThat.thumbs.length > 0) {
            for (let thumb of window.mainThat.thumbs) {
                if (thumb.thumbnail) {
                    window.mainThat.renderBase64Thumbnail(thumb.thumbnail, thumb.position, thumb.content_id)
                }
            }
        } else {
            for (let slideConfig of window.mainThat.mainConfig) {
                if (slideConfig.has_to_be_shown) {
                    window.mainThat.renderThumbnail(slideConfig.thumbnail, slideConfig.position)
                }
            }
        }
    };
    window.rnMethods.shareContent = (path) => {
        window.webViewBridge.send(
            'shareContent', {
                path
            }
        )
    };
    window.rnMethods.setThumbs = (thumbs) => {
        if (window.mainThat) {
            window.mainThat.thumbs = thumbs;
            window.mainThat.reRenderThumbnails();
        }
    };
});
`;
