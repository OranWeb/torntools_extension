requireDatabase(true).then(() => {
    console.log("TT - Enemies List");

    addXHRListener((event) => {
        const { page, xhr } = event.detail;
        if (page !== "userlist") return;

        const params = new URLSearchParams(xhr.requestBody);
        if (params.get("step") !== "blacklist") return;

        enemiesLoaded().then(() => {
            if (settings.scripts.stats_estimate.global && settings.scripts.stats_estimate.enemies_list)
                showStatsEstimates();
        });
    });

    enemiesLoaded().then(() => {
        if (settings.scripts.stats_estimate.global && settings.scripts.stats_estimate.enemies_list)
            showStatsEstimates();
    });
});

function enemiesLoaded() {
    return new Promise((resolve) => {
        let checker = setInterval(() => {
            if (doc.find(".user-info-blacklist-wrap > li > .clear")) {
                resolve(true);
                return clearInterval(checker);
            }
        });
    });
}

function showStatsEstimates() {
    estimateStatsInList("ul.user-info-blacklist-wrap > li:not(.clear)", (row) => {
        return {
            userId: row.find(".acc-wrapper a.user.name").getAttribute("href").match(/profiles\.php\?XID=([0-9]*)/i)[1]
        };
    });
}