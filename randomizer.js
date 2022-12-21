import * as Stats from "Stats";

function output_nft(amount, project, buy_timestamp, wallet, credit_usage_consent){
    // amount: the current donated amount
    // project: the project the donation is being made to
    // buy_timestamp: the moment the donation function was called
    // wallet: the user wallet address
    // credit_usage_consent: a Boolean flag if the user wants to use 
    // existing credit points to get a better Ranked NFT
    var net_project_amt = Stats.getTotalDonated(project, wallet);
    var net_user_credit = Stats.getTotalDonationByUser(wallet);
    var target_amt = Stats.getProjectTarget(project);
    var chance_factor = Math.floor(Math.random() * buy_timestamp);
    var res_factor = chance_factor / buy_timestamp;


    var chance_rank = "";
    if (res_factor > 0.999){
        chance_rank = "Platinum";
    }
    else if (res_factor <= 0.999 && res_factor > 0.99){
        chance_rank = "Gold";
    }
    else if (res_factor <= 0.99 && res_factor > 0.9) {
        chance_rank = "Silver";
    }
    else {
        chance_rank = "Bronze";
    }


    var merit_rank = "";
    if (net_project_amt + amount >= target_amt / 3) {
        merit_rank =  "Platinum";
    }

    else if (net_user_credit + amount >= 100000 && credit_usage_consent) {
        Stats.resetCredits(wallet, "Platinum");
        merit_rank = "Platinum";
    }


    else if (net_project_amt + amount < target_amt / 3 && net_project_amt + amount >= target_amt / 5) {
        merit_rank = "Gold";
    }

    else if (net_user_credit + amount < 100000 && net_user_credit + amount >= 50000 && credit_usage_consent) {
        Stats.resetCredits(wallet, "Gold");
        merit_rank = "Gold";
    }


    else if (net_project_amt + amount < target_amt / 5 && net_project_amt + amount >= target_amt / 10) {
        merit_rank = "Silver";
    }

    else if (net_user_credit + amount < 50000 && net_user_credit + amount >= 10000 && credit_usage_consent) {
        Stats.resetCredits(wallet, "Silver");
        merit_rank = "Silver";
    }
    

    
    var prioritization_scheme = Stats.getPrioritizationScheme(project);

    var project_rank_specification = Stats.getExpectedRank(project, net_project_amt + amount, merit_rank, chance_rank, prioritization_scheme);
    return project_rank_specification;
}