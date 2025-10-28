import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  DatePicker,
  Tag,
  Space,
  Card,
  Row,
  Col,
  Typography,
  Modal,
  Checkbox,
  Pagination,
  Avatar,
  Tooltip,
} from "antd";
import {
  SettingOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  UserOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useTheme } from "../theme/ThemeProvider";
import "./SubmittedRecords.css";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data for demonstration
const mockRecords = [
  {
    id: "HDC-2024-000001",
    first_name: "John",
    last_name: "Doe",
    gender: "Male",
    nationality: "NG",
    departure_country: "NG",
    destination_country: "GH",
    capture_location: "Airport",
    symptoms: [],
    submitted_at: "2024-01-15T10:30:00Z",
    email: "john.doe@email.com",
    phone_number: "+2348012345678",
    passport_number: "A12345678",
    port_of_capture: "Lagos Airport",
    trips: [
      {
        departure_country: "NG",
        destination_country: "GH",
        start_date: "2024-01-15",
        end_date: "2024-01-20",
      },
    ],
  },
  {
    id: "HDC-2024-000002",
    first_name: "Jane",
    last_name: "Smith",
    gender: "Female",
    nationality: "KE",
    departure_country: "KE",
    destination_country: "EG",
    capture_location: "Border",
    symptoms: ["fever", "cough"],
    submitted_at: "2024-01-16T14:20:00Z",
    email: "jane.smith@email.com",
    phone_number: "+254701234567",
    passport_number: "B87654321",
    port_of_capture: "Nairobi Border",
    trips: [
      {
        departure_country: "KE",
        destination_country: "EG",
        start_date: "2024-01-16",
        end_date: "2024-01-25",
      },
    ],
  },
  {
    id: "HDC-2024-000003",
    first_name: "Ahmed",
    last_name: "Hassan",
    gender: "Male",
    nationality: "EG",
    departure_country: "EG",
    destination_country: "ET",
    capture_location: "Airport",
    symptoms: ["fever", "difficulty_breathing"],
    submitted_at: "2024-01-17T09:15:00Z",
    email: "ahmed.hassan@email.com",
    phone_number: "+201234567890",
    passport_number: "C11223344",
    port_of_capture: "Cairo Airport",
    trips: [
      {
        departure_country: "EG",
        destination_country: "ET",
        start_date: "2024-01-17",
        end_date: "2024-01-22",
      },
    ],
  },
];

// Country mapping
const countryNames: { [key: string]: string } = {
  NG: "Nigeria",
  GH: "Ghana",
  KE: "Kenya",
  EG: "Egypt",
  ET: "Ethiopia",
  ZA: "South Africa",
  BW: "Botswana",
  ZW: "Zimbabwe",
  MZ: "Mozambique",
  NA: "Namibia",
  LS: "Lesotho",
  SZ: "Eswatini",
};

// Symptom mapping
const symptomNames: { [key: string]: string } = {
  fever: "Fever",
  cough: "Cough",
  difficulty_breathing: "Difficulty Breathing",
  runny_nose: "Runny Nose",
  diarrhea: "Diarrhea",
  sore_throat: "Sore Throat",
};

// Available columns for customization
const availableColumns = [
  { key: "first_name", label: "First Name", defaultVisible: true },
  { key: "last_name", label: "Last Name", defaultVisible: true },
  { key: "gender", label: "Gender", defaultVisible: true },
  { key: "nationality", label: "Nationality", defaultVisible: true },
  { key: "departure_country", label: "Departure", defaultVisible: true },
  { key: "destination_country", label: "Destination", defaultVisible: true },
  { key: "capture_location", label: "Capture Location", defaultVisible: true },
  { key: "symptoms", label: "Symptoms", defaultVisible: true },
  { key: "email", label: "Email", defaultVisible: false },
  { key: "phone_number", label: "Phone", defaultVisible: false },
  { key: "passport_number", label: "Passport", defaultVisible: false },
  { key: "port_of_capture", label: "Port of Capture", defaultVisible: false },
  { key: "submitted_at", label: "Submitted At", defaultVisible: false },
];

const SubmittedRecords: React.FC = () => {
  const { theme } = useTheme();
  const [records, setRecords] = useState(mockRecords);
  const [filteredRecords, setFilteredRecords] = useState(mockRecords);
  const [loading, setLoading] = useState(false);
  const [customizeModalVisible, setCustomizeModalVisible] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    availableColumns.filter((col) => col.defaultVisible).map((col) => col.key)
  );
  const [filters, setFilters] = useState({
    dateRange: null,
    departureCountry: "All Countries",
    destinationCountry: "All Countries",
    symptoms: [],
    riskStatus: "All Statuses",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Filter records based on current filters
  useEffect(() => {
    let filtered = [...records];

    // Date range filter
    if (filters.dateRange && filters.dateRange.length === 2) {
      const [startDate, endDate] = filters.dateRange;
      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.submitted_at);
        return recordDate >= startDate && recordDate <= endDate;
      });
    }

    // Country filters
    if (filters.departureCountry !== "All Countries") {
      filtered = filtered.filter(
        (record) => record.departure_country === filters.departureCountry
      );
    }
    if (filters.destinationCountry !== "All Countries") {
      filtered = filtered.filter(
        (record) => record.destination_country === filters.destinationCountry
      );
    }

    // Symptoms filter
    if (filters.symptoms.length > 0) {
      filtered = filtered.filter((record) =>
        filters.symptoms.some((symptom) => record.symptoms.includes(symptom))
      );
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (record) =>
          record.first_name.toLowerCase().includes(searchLower) ||
          record.last_name.toLowerCase().includes(searchLower) ||
          record.passport_number.toLowerCase().includes(searchLower)
      );
    }

    setFilteredRecords(filtered);
    setCurrentPage(1);
  }, [records, filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      dateRange: null,
      departureCountry: "All Countries",
      destinationCountry: "All Countries",
      symptoms: [],
      riskStatus: "All Statuses",
      search: "",
    });
  };

  const handleCustomizeColumns = (checkedValues: string[]) => {
    setVisibleColumns(checkedValues);
  };

  const getSymptomTags = (symptoms: string[]) => {
    if (symptoms.length === 0) {
      return <Tag color="green">None</Tag>;
    }
    return symptoms.map((symptom) => (
      <Tag
        key={symptom}
        color={
          symptom === "fever" || symptom === "difficulty_breathing"
            ? "red"
            : "orange"
        }
      >
        {symptomNames[symptom]}
      </Tag>
    ));
  };

  const getCountryName = (countryCode: string) => {
    return countryNames[countryCode] || countryCode;
  };

  const exportToCSV = () => {
    const csvContent = [
      [
        "ID",
        "First Name",
        "Last Name",
        "Gender",
        "Nationality",
        "Departure",
        "Destination",
        "Capture Location",
        "Symptoms",
        "Submitted At",
      ].join(","),
      ...filteredRecords.map((record) =>
        [
          record.id,
          record.first_name,
          record.last_name,
          record.gender,
          getCountryName(record.nationality),
          getCountryName(record.departure_country),
          getCountryName(record.destination_country),
          record.capture_location,
          record.symptoms.map((s) => symptomNames[s]).join("; "),
          new Date(record.submitted_at).toLocaleDateString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `travel-declarations-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToPDF = () => {
    // This would typically integrate with a PDF library like jsPDF
    console.log("PDF export functionality would be implemented here");
  };

  // Get unique countries for filter dropdowns
  const uniqueCountries = Array.from(
    new Set([
      ...records.map((r) => r.departure_country),
      ...records.map((r) => r.destination_country),
    ])
  ).map((code) => ({ code, name: getCountryName(code) }));

  // Pagination
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

  // Table columns based on visible columns
  const columns = availableColumns
    .filter((col) => visibleColumns.includes(col.key))
    .map((col) => {
      switch (col.key) {
        case "first_name":
          return {
            title: "FIRST NAME",
            dataIndex: "first_name",
            key: "first_name",
            render: (text: string) => (
              <Space>
                <Avatar size="small" icon={<UserOutlined />} />
                {text}
              </Space>
            ),
          };
        case "last_name":
          return {
            title: "LAST NAME",
            dataIndex: "last_name",
            key: "last_name",
          };
        case "gender":
          return {
            title: "GENDER",
            dataIndex: "gender",
            key: "gender",
          };
        case "nationality":
          return {
            title: "NATIONALITY",
            dataIndex: "nationality",
            key: "nationality",
            render: (code: string) => getCountryName(code),
          };
        case "departure_country":
          return {
            title: "DEPARTURE",
            dataIndex: "departure_country",
            key: "departure_country",
            render: (code: string) => getCountryName(code),
          };
        case "destination_country":
          return {
            title: "DESTINATION",
            dataIndex: "destination_country",
            key: "destination_country",
            render: (code: string) => getCountryName(code),
          };
        case "capture_location":
          return {
            title: "CAPTURE LOCATION",
            dataIndex: "capture_location",
            key: "capture_location",
            render: (location: string) => (
              <Space>
                <EnvironmentOutlined />
                {location}
              </Space>
            ),
          };
        case "symptoms":
          return {
            title: "SYMPTOMS",
            dataIndex: "symptoms",
            key: "symptoms",
            render: (symptoms: string[]) => getSymptomTags(symptoms),
          };
        case "submitted_at":
          return {
            title: "SUBMITTED AT",
            dataIndex: "submitted_at",
            key: "submitted_at",
            render: (date: string) => (
              <Space>
                <CalendarOutlined />
                {new Date(date).toLocaleDateString()}
              </Space>
            ),
          };
        default:
          return {
            title: col.label.toUpperCase(),
            dataIndex: col.key,
            key: col.key,
          };
      }
    });

  return (
    <div className="submitted-records">
      <div className="records-header">
        <Title level={2} style={{ margin: 0, color: theme.text.primary }}>
          Submitted Records
        </Title>
      </div>

      {/* Filters Section */}
      <Card className="filters-card" style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <label>Date Range</label>
              <RangePicker
                style={{ width: "100%" }}
                placeholder={["dd/mm/yyyy", "dd/mm/yyyy"]}
                value={filters.dateRange}
                onChange={(dates) => handleFilterChange("dateRange", dates)}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <label>Departure Country</label>
              <Select
                style={{ width: "100%" }}
                value={filters.departureCountry}
                onChange={(value) =>
                  handleFilterChange("departureCountry", value)
                }
              >
                <Option value="All Countries">All Countries</Option>
                {uniqueCountries.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <label>Destination Country</label>
              <Select
                style={{ width: "100%" }}
                value={filters.destinationCountry}
                onChange={(value) =>
                  handleFilterChange("destinationCountry", value)
                }
              >
                <Option value="All Countries">All Countries</Option>
                {uniqueCountries.map((country) => (
                  <Option key={country.code} value={country.code}>
                    {country.name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <label>Symptoms</label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select symptoms"
                value={filters.symptoms}
                onChange={(value) => handleFilterChange("symptoms", value)}
              >
                {Object.entries(symptomNames).map(([key, name]) => (
                  <Option key={key} value={key}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} sm={12} md={6}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <label>Search</label>
              <Input
                placeholder="Name or passport..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </Space>
          </Col>
          <Col xs={24} sm={12} md={12}>
            <Space style={{ marginTop: 24 }}>
              <Button
                type="primary"
                onClick={() => {}}
                style={{ backgroundColor: theme.primary.main }}
              >
                Apply Filters
              </Button>
              <Button
                onClick={clearFilters}
                style={{ color: theme.accent.main }}
              >
                Clear Filters
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Table Controls */}
      <Card className="table-controls-card" style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Button
              icon={<SettingOutlined />}
              onClick={() => setCustomizeModalVisible(true)}
            >
              Customize Table View
            </Button>
          </Col>
          <Col>
            <Space>
              <Button
                icon={<FileTextOutlined />}
                onClick={exportToCSV}
                style={{ backgroundColor: "#8B4513", color: "white" }}
              >
                Export CSV
              </Button>
              <Button
                icon={<FilePdfOutlined />}
                onClick={exportToPDF}
                style={{ backgroundColor: "#DC143C", color: "white" }}
              >
                Export PDF
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Records Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={paginatedRecords}
          rowKey="id"
          loading={loading}
          pagination={false}
          scroll={{ x: "100%" }}
        />

        {/* Pagination */}
        <div style={{ marginTop: 16, textAlign: "right" }}>
          <Space>
            <span>
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, filteredRecords.length)} of{" "}
              {filteredRecords.length} results
            </span>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredRecords.length}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size || 10);
              }}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
          </Space>
        </div>
      </Card>

      {/* Customize Columns Modal */}
      <Modal
        title="Customize Table View"
        open={customizeModalVisible}
        onOk={() => setCustomizeModalVisible(false)}
        onCancel={() => setCustomizeModalVisible(false)}
        width={600}
      >
        <div style={{ marginBottom: 16 }}>
          <p>Select the columns you want to display in the table:</p>
        </div>
        <Checkbox.Group
          value={visibleColumns}
          onChange={handleCustomizeColumns}
          style={{ width: "100%" }}
        >
          <Row gutter={[16, 16]}>
            {availableColumns.map((column) => (
              <Col span={12} key={column.key}>
                <Checkbox value={column.key}>{column.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Modal>
    </div>
  );
};

export default SubmittedRecords;
