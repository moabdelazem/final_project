package JFree;

import org.jfree.data.time.Week;

public class DiscountCalculator implements IDiscountCalculator {

    private final Week currentWeek;
    private final int specialWeek = 26;

    public DiscountCalculator(Week week)
    {
        currentWeek = week;
    }
    public boolean isTheSpecialWeek()
    {
        return currentWeek.getWeek() == specialWeek;
    }

    public int getDiscountPercentage()
    {
        int weekNumber = currentWeek.getWeek();
        return weekNumber % 2 == 0 ? 7 : 5;
    }
}
