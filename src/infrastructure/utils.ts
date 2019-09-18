
export function millisecondsToFriendlyString(duration: number): string {
    const oneDay =   86400000;
    const oneWeek =  604800000;
    const oneMonth = 2419200000;
    const oneYear =  31536000000;

    if (duration < oneYear) {
        if (duration < oneMonth) {
            if (duration < oneWeek) {
                if (duration < oneDay) {
                    return "Less than a day";
                }

                return `${Math.round(duration / oneDay)} days`;
            }

            return `${Math.round(duration / oneWeek)} weeks`;
        }

        return `${Math.round(duration / oneMonth)} months`;
    }

    return `${Math.round(duration / oneYear)} years`;
}
