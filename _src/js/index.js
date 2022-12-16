

window.$docsify = {
    auto2top: true,
    homepage: 'README.md',
    // basePath: '/',
    // relativePath: true,
    logo: '_media/note-svgrepo-com.svg',
    name: 'cccatmint',
    maxLevel: 1,
    loadNavbar: true,
    coverpage: true,
    onlyCover: false,
    loadSidebar: true,
    routerMode: 'hash',
    nameLink: '/',
    themeColor: '#E89B1A',
    alias: {
        // '/changelog':
        //   'https://raw.githubusercontent.com/docsifyjs/docsify/master/CHANGELOG',
        '/.*/_sidebar.md': '/_sidebar.md', // See #301
        '/.*/_navbar.md': '/_navbar.md', // See #301
    },
    autoHeader: true,
    mergeNavbar: true,
    formatUpdated: '{MM}/{DD} {HH}:{mm}',
    ext: '.md',
    notFoundPage: {
        '/': '_404.md',
        '/notes': 'notes/_404.md',
    },

    // plugin options
    // - countable
    count: {
        countable: true,
        position: 'top',
        margin: '10px',
        float: 'right',
        fontsize: '0.9em',
        color: 'rgb(90,90,90)',
        language: 'english',
        isExpected: true
    },

    // - pagination
    pagination: {
        previousText: '上一章节',
        nextText: '下一章节',
        crossChapter: true,
        crossChapterText: true,
    },

    // - search
    search: {
        maxAge: 86400000, // 过期时间，单位毫秒，默认一天
        placeholder: 'Type to search',
        noData: 'No Results.',
        // 搜索标题的最大层级, 1 - 6
        depth: 6,
    },

    plugins: [
        function (hook) {
            var footer = [
                '<hr/>',
                '<footer>',
                '<span style="float: right;"><a href="https://github.com/Cccatmint">cccatmint</a> &copy;2022.</span><br/>',
                '<span style="float: right;">powered by <a href="https://github.com/docsifyjs/docsify" target="_blank">docsify</a>.</span>',
                '</footer>'
            ].join('');

            hook.afterEach(function (html) {
                return html + footer;
            });
        }
    ]
}