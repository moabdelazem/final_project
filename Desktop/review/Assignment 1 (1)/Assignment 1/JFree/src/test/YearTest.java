package test;

import org.jfree.data.time.Year;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class YearTest {
    Year year;

    private void arrange() {
        year = new Year();
    }
    @Test
    public void testYearDefaultCtor() {
        arrange();
        assertEquals(2025, year.getYear());
    }

}
