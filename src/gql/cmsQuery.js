
export const cmsQuery = `query cmsContent($contentType: String!, $cmsKey: String) {
    cmsContent(contentType: $contentType, cmsKey: $cmsKey) {
        data
    }
}`;

export default {
    cmsQuery
}
